import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tipos = await prisma.tipoMedic.findMany();
    return NextResponse.json(tipos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener tipos de medicamentos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { descripcion } = await req.json();
    
    if (!descripcion) {
      return NextResponse.json(
        { error: "La descripción es requerida" },
        { status: 400 }
      );
    }

    const tipo = await prisma.tipoMedic.create({
      data: { descripcion }
    });

    return NextResponse.json(tipo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear tipo de medicamento" },
      { status: 500 }
    );
  }
}