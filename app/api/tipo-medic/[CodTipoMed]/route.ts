import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { CodTipoMed: string } }
) {
  try {
    const tipo = await prisma.tipoMedic.findUnique({
      where: { CodTipoMed: parseInt(params.CodTipoMed) }
    });

    if (!tipo) {
      return NextResponse.json(
        { error: "Tipo de medicamento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(tipo);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener tipo de medicamento" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { CodTipoMed: string } }
) {
  try {
    const { descripcion } = await req.json();

    if (!descripcion) {
      return NextResponse.json(
        { error: "La descripción es requerida" },
        { status: 400 }
      );
    }

    const tipoActualizado = await prisma.tipoMedic.update({
      where: { CodTipoMed: parseInt(params.CodTipoMed) },
      data: { descripcion }
    });

    return NextResponse.json(tipoActualizado);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar tipo de medicamento" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { CodTipoMed: string } }
) {
  try {
    const medicamentosAsociados = await prisma.medicamento.count({
      where: { CodTipoMed: parseInt(params.CodTipoMed) }
    });

    if (medicamentosAsociados > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar, hay medicamentos asociados" },
        { status: 400 }
      );
    }

    await prisma.tipoMedic.delete({
      where: { CodTipoMed: parseInt(params.CodTipoMed) }
    });

    return NextResponse.json(
      { message: "Tipo de medicamento eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar tipo de medicamento" },
      { status: 500 }
    );
  }
}