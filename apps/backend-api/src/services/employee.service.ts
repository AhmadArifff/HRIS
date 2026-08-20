import { prisma } from "@hris/database";

export interface GetEmployeesOptions {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
}

export class EmployeeService {
  public static async getEmployees(options: GetEmployeesOptions = {}) {
    const page = options.page || 1;
    const limit = options.limit || 50;
    const skip = (page - 1) * limit;

    const whereClause: any = {
      isDeleted: false,
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
      avatarUrl: "/images/user/user-01.jpg", // Fallback, not in schema
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
