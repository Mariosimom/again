import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = "admin@dubaielite.com";
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, password: passwordHash, name: "Admin" }
  });

  // Create sample blocks
  const existing = await prisma.block.count();
  if (!existing) {
    await prisma.block.createMany({
      data: [
        {
          kind: "HERO",
          title: "Dubai's Premier Real Estate",
          data: { headline: "Exceptional Properties.<br/>Extraordinary Living.", sub: "Discover exclusive luxury properties in Dubai.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80" },
          order: 0,
          published: true
        },
        {
          kind: "STATS",
          title: "Dubai Market",
          data: { stats: [ { label: "Price Growth", value: "+12.5%" }, { label: "Properties Sold", value: "18,634" }, { label: "Rental Yield", value: "7.8%" }, { label: "International Buyers", value: "68%" } ] },
          order: 1,
          published: true
        },
        {
          kind: "LISTINGS_GRID",
          title: "Featured Luxury Properties",
          data: { items: [] },
          order: 2,
          published: true
        }
      ]
    });
  }

  console.log("Seed complete.");
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(async ()=>{ await prisma.$disconnect(); });
