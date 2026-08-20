import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/Result";

export const createApplicant = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, resumeUrl } = req.body;

    // Guard Clauses
    if (!name || !email || !phone || !resumeUrl) {
      return sendResult(res, 400, Result.fail("Nama, Email, Nomor Telepon, dan Resume (CV) wajib diisi."));
    }

    // Buat data Applicant baru
    const applicant = await prisma.applicant.create({
      data: {
        name,
        email,
        phone,
        resumeUrl,
      },
    });

    // Kita asumsikan mengaitkan ke lowongan pertama yang ada untuk simulasi
    // Dalam sistem sebenarnya, `jobPostingId` harus dikirim dari frontend
    const jobPosting = await prisma.jobPosting.findFirst();
    let application = null;
    if (jobPosting) {
      // Cari status master untuk "Applied"
      let status = await prisma.masterStatus.findFirst({
        where: { category: "Application", value: "Applied" },
      });

      if (!status) {
        status = await prisma.masterStatus.create({
          data: { category: "Application", label: "Applied", value: "Applied" },
        });
      }

      application = await prisma.application.create({
        data: {
          jobPostingId: jobPosting.id,
          applicantId: applicant.id,
          applyDate: new Date(),
          statusId: status.id,
        },
      });
    }

    return sendResult(res, 201, Result.ok({ applicant, application }, "Lamaran berhasil dikirim"));
  } catch (error: any) {
    return sendResult(res, 500, Result.fail(error.message || "Terjadi kesalahan internal server"));
  }
};
