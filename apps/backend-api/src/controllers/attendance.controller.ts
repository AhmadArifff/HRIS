import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/Result";

// Helper for Euclidean distance
function euclideanDistance(desc1: number[], desc2: number[]): number {
  if (desc1.length !== desc2.length) return 1.0;
  let sum = 0;
  for (let i = 0; i < desc1.length; i++) {
    sum += Math.pow(desc1[i] - desc2[i], 2);
  }
  return Math.sqrt(sum);
}

export const getAttendances = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendances = await prisma.attendance.findMany({
      where: { deletedAt: null },
      include: {
        employee: {
          select: {
            id: true,
            employeeCode: true,
            firstName: true,
            lastName: true,
            department: { select: { name: true } },
          },
        },
        shift: true,
        status: true,
      },
      orderBy: { recordDate: "desc" },
      take: 100,
    });

    const formatted = attendances.map((item) => {
      const clockInDate = item.clockIn ? new Date(item.clockIn) : null;
      const clockOutDate = item.clockOut ? new Date(item.clockOut) : null;

      const formatTime = (d: Date | null) => {
        if (!d) return "--:--";
        return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      };

      return {
        id: item.employee?.employeeCode || item.id,
        attendanceId: item.id,
        name: `${item.employee?.firstName || "Karyawan"} ${item.employee?.lastName || ""}`.trim(),
        department: item.employee?.department?.name || "Umum",
        shiftName: item.shift?.name || "Reguler",
        shiftHours: "08:00 - 17:00",
        date: item.recordDate.toISOString().split("T")[0],
        clockIn: formatTime(clockInDate),
        clockOut: formatTime(clockOutDate),
        lateDurationMinutes: item.lateDurationMinutes || 0,
        earlyLeaveMinutes: item.earlyLeaveMinutes || 0,
        status: item.isLate ? "Terlambat" : (clockInDate ? "Hadir" : "Mangkir"),
        location: item.locationInLatlng ? "Kantor Pusat" : "Remote (WFH)",
      };
    });

    sendResult(res, 200, Result.ok(formatted, "Berhasil mengambil data absensi"));
  } catch (error: any) {
    console.error("Get Attendances Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal mengambil data absensi"));
  }
};

export const clockIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, faceDescriptor, locationInLatlng } = req.body;

    if (!employeeId || !faceDescriptor) {
      sendResult(res, 400, Result.fail("Employee ID dan Face Descriptor wajib diisi"));
      return;
    }

    // 1. Fetch Employee
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        status: true,
      },
    });

    if (!employee) {
      sendResult(res, 404, Result.fail("Karyawan tidak ditemukan"));
      return;
    }

    // 2. Face Verification (if employee has registered face)
    if (employee.faceDescriptor) {
      const savedDescriptor = employee.faceDescriptor as number[];
      const distance = euclideanDistance(faceDescriptor, savedDescriptor);

      // Threshold 0.45 for Face-API.js (Euclidean distance)
      if (distance > 0.45) {
        sendResult(
          res,
          401,
          Result.fail(`Wajah tidak dikenali atau tidak cocok. (Distance: ${distance.toFixed(2)})`)
        );
        return;
      }
    } else {
      console.log("Karyawan belum memiliki data wajah, melewati verifikasi wajah untuk testing.");
    }

    // 3. Find today's shift (or create a default if none exists)
    let shift = await prisma.shiftMaster.findFirst({
      where: { isActive: true },
    });

    if (!shift) {
      shift = await prisma.shiftMaster.create({
        data: {
          name: "Shift Reguler",
          startTime: new Date("1970-01-01T08:00:00Z"),
          endTime: new Date("1970-01-01T17:00:00Z"),
          totalWorkHours: 8.0,
          toleranceMinutes: 15,
          isActive: true,
        },
      });
    }

    // 4. Record Attendance
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if already clocked in today
    const existing = await prisma.attendance.findFirst({
      where: {
        employeeId,
        recordDate: today,
      },
    });

    if (existing && existing.clockIn) {
      sendResult(res, 400, Result.fail("Anda sudah melakukan clock in hari ini"));
      return;
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        shiftId: shift.id,
        recordDate: today,
        clockIn: new Date(),
        locationInLatlng: locationInLatlng || null,
        statusId: employee.statusId,
      },
    });

    sendResult(res, 201, Result.ok(attendance, "Clock In Berhasil"));
  } catch (error: any) {
    console.error("Clock In Error:", error);
    sendResult(res, 500, Result.fail("Terjadi kesalahan internal server saat Clock In"));
  }
};
