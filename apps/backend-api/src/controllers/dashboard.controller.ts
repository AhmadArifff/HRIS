import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/Result";

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalEmployees, presentToday, pendingLeaves, activeJobs] = await Promise.all([
      prisma.employee.count({ where: { deletedAt: null } }),
      prisma.attendance.count({
        where: {
          recordDate: { gte: today },
          clockIn: { not: null },
          deletedAt: null,
        },
      }),
      prisma.leaveRequest.count({
        where: {
          status: { value: "Pending" },
          deletedAt: null,
        },
      }),
      prisma.jobPosting.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    const stats = {
      totalEmployees,
      presentToday,
      attendancePercentage: totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0,
      pendingLeaves,
      activeJobs,
    };

    sendResult(res, 200, Result.ok(stats, "Berhasil mengambil statistik dashboard dari database Supabase"));
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal mengambil statistik dashboard"));
  }
};
