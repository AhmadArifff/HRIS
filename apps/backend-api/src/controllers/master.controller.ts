import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/result";

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

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { code, name } = req.body;
    if (!code || !name) return sendResult(res, 400, Result.fail("Kode dan nama departemen wajib diisi"));

    const exists = await prisma.department.findUnique({ where: { code } });
    if (exists) return sendResult(res, 400, Result.fail("Kode departemen sudah digunakan"));

    const department = await prisma.department.create({ data: { code, name } });
    return sendResult(res, 201, Result.ok(department, "Departemen berhasil dibuat"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal membuat departemen"));
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code, name } = req.body;
    
    if (!code || !name) return sendResult(res, 400, Result.fail("Kode dan nama departemen wajib diisi"));

    const department = await prisma.department.update({
      where: { id },
      data: { code, name },
    });
    return sendResult(res, 200, Result.ok(department, "Departemen berhasil diperbarui"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal memperbarui departemen"));
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return sendResult(res, 200, Result.ok(null, "Departemen berhasil dihapus"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal menghapus departemen"));
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

export const createPosition = async (req: Request, res: Response) => {
  try {
    const { code, name, departmentId } = req.body;
    if (!code || !name || !departmentId) return sendResult(res, 400, Result.fail("Kode, nama, dan departemen wajib diisi"));

    const exists = await prisma.position.findUnique({ where: { code } });
    if (exists) return sendResult(res, 400, Result.fail("Kode jabatan sudah digunakan"));

    const position = await prisma.position.create({ data: { code, name, departmentId } });
    return sendResult(res, 201, Result.ok(position, "Jabatan berhasil dibuat"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal membuat jabatan"));
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code, name, departmentId } = req.body;
    
    if (!code || !name || !departmentId) return sendResult(res, 400, Result.fail("Kode, nama, dan departemen wajib diisi"));

    const position = await prisma.position.update({
      where: { id },
      data: { code, name, departmentId },
    });
    return sendResult(res, 200, Result.ok(position, "Jabatan berhasil diperbarui"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal memperbarui jabatan"));
  }
};

export const deletePosition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.position.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return sendResult(res, 200, Result.ok(null, "Jabatan berhasil dihapus"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Gagal menghapus jabatan"));
  }
};
