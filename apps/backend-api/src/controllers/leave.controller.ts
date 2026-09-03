import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/Result";

export const getLeaveRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const leaves = await prisma.leaveRequest.findMany({
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
        leaveType: true,
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = leaves.map((item) => {
      const start = item.startDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
      const end = item.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
      const diffTime = Math.abs(item.endDate.getTime() - item.startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      return {
        id: item.id,
        name: `${item.employee?.firstName || "Karyawan"} ${item.employee?.lastName || ""}`.trim(),
        department: item.employee?.department?.name || "Umum",
        type: item.leaveType?.name || "Cuti Tahunan",
        duration: `${diffDays} Hari`,
        date: start === end ? start : `${start} - ${end}`,
        status: (item.status?.value as "Approved" | "Pending" | "Rejected") || "Pending",
        reason: item.reason,
      };
    });

    sendResult(res, 200, Result.ok(formatted, "Berhasil mengambil data pengajuan cuti"));
  } catch (error: any) {
    console.error("Get Leave Requests Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal mengambil data pengajuan cuti"));
  }
};

export const createLeaveRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, type, startDate, endDate, reason, attachmentUrl } = req.body;

    if (!type || !startDate || !endDate || !reason) {
      sendResult(res, 400, Result.fail("Jenis Cuti, Tanggal Mulai, Tanggal Selesai, dan Alasan wajib diisi"));
      return;
    }

    // Find employee or fallback to first employee
    let emp = null;
    if (employeeId) {
      emp = await prisma.employee.findUnique({ where: { id: employeeId } });
    }
    if (!emp) {
      emp = await prisma.employee.findFirst();
    }
    if (!emp) {
      sendResult(res, 400, Result.fail("Tidak ada data karyawan ditemukan. Silakan tambahkan karyawan terlebih dahulu."));
      return;
    }

    // Find or create leave type
    let leaveType = await prisma.leaveType.findFirst({
      where: { name: { contains: type, mode: "insensitive" } },
    });
    if (!leaveType) {
      leaveType = await prisma.leaveType.create({
        data: {
          name: type,
          maxDaysPerYear: 12,
        },
      });
    }

    // Find or create "Pending" status
    let status = await prisma.masterStatus.findFirst({
      where: { category: "Leave", value: "Pending" },
    });
    if (!status) {
      status = await prisma.masterStatus.create({
        data: { category: "Leave", label: "Pending", value: "Pending" },
      });
    }

    const leave = await prisma.leaveRequest.create({
      data: {
        employeeId: emp.id,
        leaveTypeId: leaveType.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        statusId: status.id,
        attachmentUrl: attachmentUrl || null,
      },
      include: {
        leaveType: true,
        status: true,
      },
    });

    sendResult(res, 201, Result.ok(leave, "Pengajuan cuti berhasil dikirim"));
  } catch (error: any) {
    console.error("Create Leave Request Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal membuat pengajuan cuti"));
  }
};

export const updateLeaveStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status: targetStatusName } = req.body;

    if (!targetStatusName) {
      sendResult(res, 400, Result.fail("Status persetujuan wajib diisi"));
      return;
    }

    let status = await prisma.masterStatus.findFirst({
      where: { category: "Leave", value: targetStatusName },
    });
    if (!status) {
      status = await prisma.masterStatus.create({
        data: { category: "Leave", label: targetStatusName, value: targetStatusName },
      });
    }

    const updated = await prisma.leaveRequest.update({
      where: { id },
      data: { statusId: status.id },
      include: {
        status: true,
      },
    });

    sendResult(res, 200, Result.ok(updated, `Status pengajuan cuti berhasil diubah menjadi ${targetStatusName}`));
  } catch (error: any) {
    console.error("Update Leave Status Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal memperbarui status cuti"));
  }
};
