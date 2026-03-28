import { db } from "./src/lib/db";

async function test() {
  console.log("Testing DB connection and user creation...");
  try {
    const testPhone = "test-" + Math.random().toString(36).substring(7);
    const user = await db.user.create({
      data: {
        name: "Test User",
        phone: testPhone,
        password: "hashedpassword",
      },
    });
    console.log("SUCCESS: User created:", user.id);
    
    // Cleanup
    await db.user.delete({ where: { id: user.id } });
    console.log("SUCCESS: Test user deleted.");
  } catch (error) {
    console.error("FAILURE: Database operation failed!");
    console.error(error);
  }
}

test();
