import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract text fields
    const name = formData.get("name") as string;
    const categorySlug = formData.get("category") as string;
    const priceStr = formData.get("price") as string;
    const stockStr = formData.get("stock") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    // Validate
    if (!name || !categorySlug || !priceStr || !stockStr) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    const price = parseFloat(priceStr);
    const stock = parseInt(stockStr, 10);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    let imageUrl = null;

    // Handle Local Image Upload (Fallback for Vercel Blob)
    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create a unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${imageFile.name.replace(/\s+/g, '-')}`;
      
      // Save to public/uploads
      const uploadDir = join(process.cwd(), "public", "uploads");
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      imageUrl = `/uploads/${filename}`;
    }

    // Upsert Category to ensure it exists
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: {
        name: categoryName,
        slug: categorySlug,
      }
    });

    // Create Product in Database
    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        imageUrl,
        categoryId: category.id
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Error al crear el producto en la base de datos.", detail: message },
      { status: 500 }
    );
  }
}
