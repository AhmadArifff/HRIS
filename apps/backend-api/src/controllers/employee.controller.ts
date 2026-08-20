import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { Result, sendResult } from "../utils/Result";

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

    const result = Result.ok(resultData, "Berhasil mengambil data karyawan");
    return sendResult(res, 200, result);
  } catch (error: any) {
    const result = Result.fail(error.message || "Terjadi kesalahan saat mengambil data karyawan");
    return sendResult(res, 500, result);
  }
};
