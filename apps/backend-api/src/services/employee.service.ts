import { prisma } from "@hris/database";

export interface GetEmployeesOptions {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
}

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  departmentId: string;
  positionId: string;
  joinDate: string;
  employeeCode: string;
  avatarUrl?: string;
}

export class EmployeeService {
  public static async createEmployee(data: CreateEmployeeInput) {
    // 1. Get role id for "Staff" (or default role)
    const staffRole = await prisma.role.findFirst({
      where: { name: "Staff" }
    });

    if (!staffRole) {
      throw new Error("Role Staff tidak ditemukan. Harap jalankan seed database.");
    }

    // 2. Get status id for "Active"
    const activeStatus = await prisma.masterStatus.findFirst({
      where: { category: "Employee", value: "Active" }
    });

    if (!activeStatus) {
      throw new Error("Status Active tidak ditemukan. Harap jalankan seed database.");
    }

    // 3. Create using Transaction
    return await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash: "$2b$10$xyz123...", // default dummy hash
          roleId: staffRole.id,
          avatarUrl: data.avatarUrl,
        }
      });

      // Create employee
      const employee = await tx.employee.create({
        data: {
          userId: user.id,
          employeeCode: data.employeeCode,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: new Date(data.birthDate),
          gender: data.gender,
          phone: data.phone,
          departmentId: data.departmentId,
          positionId: data.positionId,
          joinDate: new Date(data.joinDate),
          statusId: activeStatus.id,
        }
      });

      return employee;
    });
  }
  public static async getEmployees(options: GetEmployeesOptions = {}) {
    const page = options.page || 1;
    const limit = options.limit || 50;
    const skip = (page - 1) * limit;

    const whereClause: any = {
      deletedAt: null,
    };

    if (options.search) {
      whereClause.OR = [
        { firstName: { contains: options.search, mode: "insensitive" } },
        { lastName: { contains: options.search, mode: "insensitive" } },
        { user: { email: { contains: options.search, mode: "insensitive" } } },
        { employeeCode: { contains: options.search, mode: "insensitive" } },
      ];
    }

    if (options.departmentId) {
      whereClause.departmentId = options.departmentId;
    }

    const [data, total] = await Promise.all([
      prisma.employee.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              email: true,
              avatarUrl: true,
              role: {
                select: { name: true }
              }
            },
          },
          department: {
            select: {
              name: true,
            },
          },
          position: {
            select: {
              name: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          joinDate: "desc",
        },
      }),
      prisma.employee.count({
        where: whereClause,
      }),
    ]);

    // Flatten user properties to the root of each employee object for easier frontend consumption
    const formattedData = data.map((emp: any) => ({
      ...emp,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.user?.email || "",
      avatarUrl: emp.user?.avatarUrl || "/images/user/user-01.jpg",
      role: emp.user?.role?.name || "Staff",
      departmentName: emp.department?.name || "N/A",
      positionTitle: emp.position?.name || "N/A",
      positionLevel: "STAFF",
    }));

    return {
      data: formattedData,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
