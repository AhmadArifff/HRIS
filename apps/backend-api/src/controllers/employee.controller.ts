import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { Result, sendResult } from "../utils/Result";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      firstName, lastName, email, phone, birthDate,
      gender, departmentId, positionId, joinDate,
      employeeCode, avatarUrl, faceImageBase64, faceImagesBase64
    } = req.body;

    // Guard Clauses
    if (!firstName || !lastName || !email || !departmentId || !positionId || !employeeCode) {
      return sendResult(res, 400, Result.fail("Kolom wajib (Nama, Email, Departemen, Posisi, ID) harus diisi."));
    }

    const employee = await EmployeeService.createEmployee({
      firstName, lastName, email, phone, birthDate,
      gender, departmentId, positionId, joinDate,
      employeeCode, avatarUrl, faceImageBase64, faceImagesBase64
    });

    return sendResult(res, 201, Result.ok(employee, "Karyawan berhasil ditambahkan."));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Terjadi kesalahan saat menambahkan karyawan."));
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const search = req.query.search as string | undefined;
    const departmentId = req.query.departmentId as string | undefined;

    const resultData = await EmployeeService.getEmployees({
      page,
      limit,
      search,
      departmentId,
    });

    const result = Result.ok(resultData, "Berhasil mengambil data karyawan dari database Supabase");
    return sendResult(res, 200, result);
  } catch (error: any) {
    console.error("Error in getEmployees:", error);
    return sendResult(res, 500, Result.fail(error.message || "Gagal mengambil data karyawan dari database"));
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResult(res, 400, Result.fail("ID Karyawan wajib disertakan"));
    }

    const employee = await EmployeeService.getEmployeeById(id);
    if (!employee) {
      return sendResult(res, 404, Result.fail("Karyawan tidak ditemukan di database Supabase"));
    }

    return sendResult(res, 200, Result.ok(employee, "Berhasil mengambil detail karyawan"));
  } catch (error: any) {
    console.error("Error in getEmployeeById:", error);
    return sendResult(res, 500, Result.fail(error.message || "Gagal mengambil detail karyawan"));
  }
};
