import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    await db.command({ ping: 1 });
    return NextResponse.json({ success: true, message: "✅ Connected to MongoDB" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "❌ Connection failed" });
  }
}
