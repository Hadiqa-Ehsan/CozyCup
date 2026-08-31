import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Enter a valid mobile number"),
  gender: z.string().optional(),
  dob: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        passwordHash,
        // Include gender and dob if your Prisma schema supports them, 
        // otherwise remove them from this object if they aren't columns yet.
      },
    });

    return NextResponse.json(
      { message: "User created successfully", id: user.id, email: user.email },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.flatten() }, { status: 400 });
    }
    console.error("Registration error:", err);
    return NextResponse.json(
      { message: "Could not create account." },
      { status: 500 }
    );
  }
}