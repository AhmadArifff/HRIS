import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result } from "../utils/result";

// Helper for Euclidean distance
function euclideanDistance(desc1: number[], desc2: number[]): number {
  if (desc1.length !== desc2.length) return 1.0;
  let sum = 0;
  for (let i = 0; i < desc1.length; i++) {
    sum += Math.pow(desc1[i] - desc2[i], 2);
  }
  return Math.sqrt(sum);
}

export const clockIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, faceDescriptor, locationInLatlng } = req.body;

    if (!employeeId || !faceDescriptor) {
      res.status(400).json(Result.error("Employee ID dan Face Descriptor wajib diisi"));
      return;
    }

    // 1. Fetch Employee
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        status: true
      }
    });

    if (!employee) {
      res.status(404).json(Result.error("Karyawan tidak ditemukan"));
      return;
    }

    // 2. Face Verification (if employee has registered face)
    if (employee.faceDescriptor) {
      const savedDescriptor = employee.faceDescriptor as number[];
      const distance = euclideanDistance(faceDescriptor, savedDescriptor);
      
      // Threshold 0.45 for Face-API.js (Euclidean distance)
      if (distance > 0.45) {
        res.status(401).json(Result.error(`Wajah tidak dikenali atau tidak cocok. (Distance: ${distance.toFixed(2)})`));
        return;
      }
    } else {
      // For this simulation MVP, if no face is registered, we accept it and could optionally save it
      // await prisma.employee.update({ where: { id }, data: { faceDescriptor }})
      console.log("Karyawan belum memiliki data wajah, melewati verifikasi wajah untuk testing.");
    }

    // 3. Find today's shift (Dummy logic: get first active shift master)
    const shift = await prisma.shiftMaster.findFirst({
      where: { isActive: true }
    });

    if (!shift) {
      res.status(400).json(Result.error("Tidak ada jadwal shift aktif ditemukan"));
      return;
    }

    // 4. Record Attendance
    const now = new Date();
    
    // Check if already clocked in today
    const existing = await prisma.attendance.findFirst({
      where: {
        employeeId,
        recordDate: new Date(now.setHours(0,0,0,0))
      }
    });

    if (existing && existing.clockIn) {
      res.status(400).json(Result.error("Anda sudah melakukan clock in hari ini"));
      return;
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        shiftId: shift.id,
        recordDate: new Date(new Date().setHours(0,0,0,0)),
        clockIn: new Date(),
        locationInLatlng: locationInLatlng || null,
        statusId: employee.statusId, // Assuming using employee's current active status for the attendance record
      }
    });

    res.status(201).json(Result.success(attendance, "Clock In Berhasil"));
  } catch (error: any) {
    console.error("Clock In Error:", error);
    res.status(500).json(Result.error("Terjadi kesalahan internal server saat Clock In"));
  }
};
