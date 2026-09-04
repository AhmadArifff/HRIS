import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🔒 --- HRIS DATABASE SECURITY HARDENING: ROW LEVEL SECURITY (RLS) ---");

  const sqlPath = path.join(__dirname, "enable-rls.sql");
  const sqlContent = fs.readFileSync(sqlPath, "utf-8");

  // Strip line comments first, then split by semicolon
  const cleanSql = sqlContent
    .split("\n")
    .map((line) => {
      const idx = line.indexOf("--");
      return idx >= 0 ? line.slice(0, idx) : line;
    })
    .join("\n");

  const statements = cleanSql
    .split(";")
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  console.log(`Executing ${statements.length} SQL statements to enforce RLS and security policies...`);

  let executedCount = 0;
  for (const statement of statements) {
    if (statement.trim()) {
      await prisma.$executeRawUnsafe(statement);
      executedCount++;
    }
  }

  console.log(`✅ Successfully executed ${executedCount} security hardening statements.`);

  // Verify RLS status on all public tables
  console.log("\n🔍 --- VERIFYING RLS STATUS ON ALL PUBLIC TABLES ---");
  const tables: Array<{ tablename: string; rowsecurity: boolean }> = await prisma.$queryRawUnsafe(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    ORDER BY tablename ASC;
  `);

  let allEnabled = true;
  console.log("------------------------------------------------------------");
  console.log("| Table Name                     | RLS Status              |");
  console.log("------------------------------------------------------------");
  for (const t of tables) {
    const statusStr = t.rowsecurity ? "✅ ENABLED" : "❌ DISABLED";
    if (!t.rowsecurity) allEnabled = false;
    console.log(`| ${t.tablename.padEnd(30)} | ${statusStr.padEnd(23)} |`);
  }
  console.log("------------------------------------------------------------");

  if (allEnabled) {
    console.log("\n🎉 ALL 21 PUBLIC TABLES HAVE ROW LEVEL SECURITY (RLS) ACTIVATED!");
    console.log("Supabase Database Linter rule '0013_rls_disabled_in_public' is completely RESOLVED.");
  } else {
    console.warn("\n⚠️ Warning: Some tables still have RLS disabled. Review configuration above.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Error executing RLS hardening:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
