import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const especialidades = await prisma.especialidad.findMany();
    return NextResponse.json(especialidades);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener especialidades" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { descripcionEsp } = await req.json();
    
    if (!descripcionEsp) {
      return NextResponse.json(
        { error: "La descripción es requerida" },
        { status: 400 }
      );
    }

    const especialidad = await prisma.especialidad.create({
      data: { descripcionEsp }
    });

    return NextResponse.json(especialidad, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear especialidad" },
      { status: 500 }
    );
  }
}