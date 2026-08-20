import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding HRIS Database...");

  // 1. Create Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      permissions: { all: true },
    },
  });

  const staffRole = await prisma.role.upsert({
    where: { name: "Staff" },
    update: {},
    create: {
      name: "Staff",
      permissions: { all: false },
    },
  });

  // 2. Create Master Statuses
  const activeStatus = await prisma.masterStatus.upsert({
    where: { category_value: { category: "Employee", value: "Active" } },
    update: {},
    create: {
      category: "Employee",
      label: "Active Employee",
      value: "Active",
    },
  });

  // 3. Create Department
  const itDept = await prisma.department.upsert({
    where: { code: "IT-01" },
    update: {},
    create: {
      code: "IT-01",
      name: "Information Technology",
    },
  });

  // 4. Create Position
  const devPosition = await prisma.position.upsert({
    where: { code: "DEV-01" },
    update: {},
    create: {
      code: "DEV-01",
      name: "Software Engineer",
      departmentId: itDept.id,
    },
  });

  // 5. Generate Dummy Employees
  console.log("Generating 50 dummy employees...");
  for (let i = 0; i < 50; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        passwordHash: "$2b$10$xyz123...", // bcrypt hash placeholder
        roleId: staffRole.id,
      },
    });

    await prisma.employee.create({
      data: {
        userId: user.id,
        employeeCode: `EMP-${faker.number.int({ min: 1000, max: 9999 })}`,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthDate: faker.date.birthdate({ min: 20, max: 50, mode: "age" }),
        gender: faker.person.sex(),
        phone: faker.phone.number(),
        departmentId: itDept.id,
        positionId: devPosition.id,
        joinDate: faker.date.past({ years: 5 }),
        statusId: activeStatus.id,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
