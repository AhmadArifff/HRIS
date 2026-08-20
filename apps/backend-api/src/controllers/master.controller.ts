import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/Result";

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    });
    return sendResult(res, 200, Result.ok(departments, "Berhasil mengambil departemen"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal mengambil departemen"));
  }
};

export const getPositions = async (req: Request, res: Response) => {
  try {
    const departmentId = req.query.departmentId as string | undefined;
    
    const whereClause: any = { deletedAt: null };
    if (departmentId) {
      whereClause.departmentId = departmentId;
    }

    const positions = await prisma.position.findMany({
      where: whereClause,
      orderBy: { name: "asc" }
    });
    return sendResult(res, 200, Result.ok(positions, "Berhasil mengambil posisi"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal mengambil posisi"));
  }
};
