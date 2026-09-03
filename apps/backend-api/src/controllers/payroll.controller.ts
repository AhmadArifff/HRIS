import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/Result";

export const getPayrollComponents = async (req: Request, res: Response): Promise<void> => {
  try {
    const components = await prisma.payrollComponent.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "asc" },
    });

    const formatted = components.map((comp, idx) => ({
      id: comp.id,
      code: `COMP-0${idx + 1}`,
      name: comp.name,
      type: comp.type as "Allowance" | "Deduction",
      amount: comp.type === "Deduction" ? "- Rp 100.000" : "Rp 1.000.000",
      taxable: comp.isTaxable,
    }));

    sendResult(res, 200, Result.ok(formatted, "Berhasil mengambil komponen gaji"));
  } catch (error: any) {
    console.error("Get Payroll Components Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal mengambil komponen gaji"));
  }
};

export const createPayrollComponent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, isTaxable } = req.body;

    if (!name || !type) {
      sendResult(res, 400, Result.fail("Nama komponen dan jenis tunjangan/potongan wajib diisi"));
      return;
    }

    const component = await prisma.payrollComponent.create({
      data: {
        name,
        type,
        isTaxable: isTaxable ?? true,
      },
    });

    sendResult(res, 201, Result.ok(component, "Komponen gaji berhasil dibuat"));
  } catch (error: any) {
    console.error("Create Payroll Component Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal membuat komponen gaji"));
  }
};
