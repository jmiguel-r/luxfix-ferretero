import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Error al obtener categorías.", detail: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "El nombre y el slug son obligatorios." },
        { status: 400 }
      );
    }

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una categoría con ese slug.", detail: `Slug '${slug}' ya está en uso.` },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Error al crear la categoría.", detail: message },
      { status: 500 }
    );
  }
}
