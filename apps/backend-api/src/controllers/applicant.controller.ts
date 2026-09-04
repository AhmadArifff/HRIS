import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { Result, sendResult } from "../utils/Result";

export const getApplicants = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicants = await prisma.applicant.findMany({
      where: { deletedAt: null },
      include: {
        applications: {
          include: {
            jobPosting: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = applicants.map((app, index) => {
      const firstApplication = app.applications[0];
      const rawStatus = (firstApplication?.status?.value || "Applied").toLowerCase();
      
      let mappedStatus: "applied" | "screening" | "interview" | "offered" | "hired" = "applied";
      if (rawStatus.includes("screen")) mappedStatus = "screening";
      else if (rawStatus.includes("interview")) mappedStatus = "interview";
      else if (rawStatus.includes("offer")) mappedStatus = "offered";
      else if (rawStatus.includes("hire")) mappedStatus = "hired";

      const appDate = firstApplication?.applyDate || app.createdAt;
      const formattedDate = appDate.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });

      return {
        id: app.id,
        applicationId: firstApplication?.id || app.id,
        numericId: index + 1,
        name: app.name,
        role: firstApplication?.jobPosting?.title || "Staff Applicant",
        status: mappedStatus,
        score: "85/100",
        date: formattedDate,
        email: app.email,
        phone: app.phone || "-",
        experience: "2-3 Tahun",
        resumeUrl: app.resumeUrl,
      };
    });

    sendResult(res, 200, Result.ok(formatted, "Berhasil mengambil data pelamar"));
  } catch (error: any) {
    console.error("Get Applicants Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal mengambil data pelamar"));
  }
};

export const createApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, resumeUrl } = req.body;

    // Guard Clauses
    if (!name || !email || !phone || !resumeUrl) {
      sendResult(res, 400, Result.fail("Nama, Email, Nomor Telepon, dan Resume (CV) wajib diisi."));
      return;
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

    // Cari atau buat lowongan default
    let jobPosting = await prisma.jobPosting.findFirst();
    if (!jobPosting) {
      let dept = await prisma.department.findFirst();
      if (!dept) {
        dept = await prisma.department.create({
          data: { code: "GEN", name: "General Administration" },
        });
      }
      let activeStatus = await prisma.masterStatus.findFirst({
        where: { category: "JobPosting", value: "Active" },
      });
      if (!activeStatus) {
        activeStatus = await prisma.masterStatus.create({
          data: { category: "JobPosting", label: "Active", value: "Active" },
        });
      }
      jobPosting = await prisma.jobPosting.create({
        data: {
          title: "Talent Pool Generalist",
          departmentId: dept.id,
          description: "General application for active talent pipeline.",
          requirements: "Relevant skills and good attitude.",
          statusId: activeStatus.id,
        },
      });
    }

    // Cari status master untuk "Applied"
    let status = await prisma.masterStatus.findFirst({
      where: { category: "Application", value: "Applied" },
    });

    if (!status) {
      status = await prisma.masterStatus.create({
        data: { category: "Application", label: "Applied", value: "Applied" },
      });
    }

    const application = await prisma.application.create({
      data: {
        jobPostingId: jobPosting.id,
        applicantId: applicant.id,
        applyDate: new Date(),
        statusId: status.id,
      },
    });

    sendResult(res, 201, Result.ok({ applicant, application }, "Lamaran berhasil dikirim"));
  } catch (error: any) {
    console.error("Create Applicant Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Terjadi kesalahan internal server"));
  }
};

export const updateApplicantStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status: targetStage } = req.body;

    if (!targetStage) {
      sendResult(res, 400, Result.fail("Target tahapan wajib diisi"));
      return;
    }

    // Map status string to PascalCase label
    const stageLabel = targetStage.charAt(0).toUpperCase() + targetStage.slice(1);

    let status = await prisma.masterStatus.findFirst({
      where: { category: "Application", value: stageLabel },
    });
    if (!status) {
      status = await prisma.masterStatus.create({
        data: { category: "Application", label: stageLabel, value: stageLabel },
      });
    }

    // Try finding by application ID or applicant ID
    const application = await prisma.application.findFirst({
      where: {
        OR: [
          { id },
          { applicantId: id },
        ],
      },
    });

    if (application) {
      const updated = await prisma.application.update({
        where: { id: application.id },
        data: { statusId: status.id },
      });
      sendResult(res, 200, Result.ok(updated, `Tahapan lamaran berhasil diubah ke ${stageLabel}`));
      return;
    }

    sendResult(res, 404, Result.fail("Data lamaran tidak ditemukan"));
  } catch (error: any) {
    console.error("Update Applicant Stage Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal mengubah tahapan lamaran"));
  }
};

export const getJobPostings = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { deletedAt: null },
      include: {
        department: true,
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      department: job.department?.name || "General",
      location: "Jakarta (Hybrid)",
      type: "Full-Time",
      description: job.description,
      requirements: job.requirements,
    }));

    sendResult(res, 200, Result.ok(formatted, "Berhasil mengambil data lowongan kerja"));
  } catch (error: any) {
    console.error("Get Job Postings Error:", error);
    sendResult(res, 500, Result.fail(error.message || "Gagal mengambil data lowongan kerja"));
  }
};

