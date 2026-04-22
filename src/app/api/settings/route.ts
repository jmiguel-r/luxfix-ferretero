import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "singleton";

export async function GET() {
  try {
    const settings = await prisma.storeSettings.upsert({
      where: { id: SETTINGS_ID },
      update: {},
      create: { id: SETTINGS_ID, updatedAt: new Date() },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Error al obtener configuración.", detail: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const settings = await prisma.storeSettings.upsert({
      where: { id: SETTINGS_ID },
      update: {
        storeName: body.storeName,
        email: body.email,
        phone: body.phone,
        currency: body.currency,
        description: body.description,
        theme: body.theme,
        notifyLowStock: body.notifyLowStock,
        notifyNewOrders: body.notifyNewOrders,
        notifyWeeklyReport: body.notifyWeeklyReport,
        updatedAt: new Date(),
      },
      create: {
        id: SETTINGS_ID,
        storeName: body.storeName ?? "LuxFix Ferretero",
        email: body.email ?? "contacto@luxfix.mx",
        phone: body.phone ?? "",
        currency: body.currency ?? "MXN",
        description: body.description ?? "",
        theme: body.theme ?? "dark-gold",
        notifyLowStock: body.notifyLowStock ?? true,
        notifyNewOrders: body.notifyNewOrders ?? true,
        notifyWeeklyReport: body.notifyWeeklyReport ?? false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error saving settings:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Error al guardar configuración.", detail: message },
      { status: 500 }
    );
  }
}
