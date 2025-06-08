import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { CodEspec: string } }
) {
  try {
    const especialidad = await prisma.especialidad.findUnique({
      where: { CodEspec: parseInt(params.CodEspec) }
    });

    if (!especialidad) {
      return NextResponse.json(
        { error: "Especialidad no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(especialidad);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener especialidad" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { CodEspec: string } }
) {
  try {
    const { descripcionEsp } = await req.json();

    if (!descripcionEsp) {
      return NextResponse.json(
        { error: "La descripción es requerida" },
        { status: 400 }
      );
    }

    const especialidadActualizada = await prisma.especialidad.update({
      where: { CodEspec: parseInt(params.CodEspec) },
      data: { descripcionEsp }
    });

    return NextResponse.json(especialidadActualizada);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar especialidad" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { CodEspec: string } }
) {
  try {
    // Verificar si hay medicamentos asociados
    const medicamentosAsociados = await prisma.medicamento.count({
      where: { CodEspec: parseInt(params.CodEspec) }
    });

    if (medicamentosAsociados > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar, hay medicamentos asociados" },
        { status: 400 }
      );
    }

    await prisma.especialidad.delete({
      where: { CodEspec: parseInt(params.CodEspec) }
    });

    return NextResponse.json(
      { message: "Especialidad eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar especialidad" },
      { status: 500 }
    );
  }
}