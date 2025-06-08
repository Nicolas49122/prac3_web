import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { CodMedicamento: string } }
) {
  try {
    const medicamento = await prisma.medicamento.findUnique({
      where: { CodMedicamento: parseInt(params.CodMedicamento) },
      include: {
        tipoMedic: true,
        especialidad: true
      }
    });

    if (!medicamento) {
      return NextResponse.json(
        { error: "Medicamento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(medicamento);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener medicamento" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { CodMedicamento: string } }
) {
  try {
    const data = await req.json();
    
    // Validar ID
    if (!params.CodMedicamento || isNaN(parseInt(params.CodMedicamento))) {
      return NextResponse.json(
        { error: "ID de medicamento inválido" },
        { status: 400 }
      );
    }

    // Validar datos requeridos
    const requiredFields = ['descripcionMed', 'fechaFabricacion', 'fechaVencimiento', 'Presentacion'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Campo requerido faltante: ${field}` },
          { status: 400 }
        );
      }
    }

    const updateData = {
      descripcionMed: data.descripcionMed,
      fechaFabricacion: new Date(data.fechaFabricacion),
      fechaVencimiento: new Date(data.fechaVencimiento),
      Presentacion: data.Presentacion,
      stock: parseInt(data.stock) || 0,
      precioVentaUni: parseFloat(data.precioVentaUni) || 0,
      precioVentaPres: parseFloat(data.precioVentaPres) || 0,
      Marca: data.Marca,
      CodTipoMed: parseInt(data.CodTipoMed),
      CodEspec: parseInt(data.CodEspec)
    };

    const medicamentoActualizado = await prisma.medicamento.update({
      where: { CodMedicamento: parseInt(params.CodMedicamento) },
      data: updateData,
      include: {
        tipoMedic: true,
        especialidad: true
      }
    });

    return NextResponse.json(medicamentoActualizado);
  } catch (error: any) {
    console.error("Error en PUT:", error);
    return NextResponse.json(
      { 
        error: "Error al actualizar medicamento",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { CodMedicamento: string } }
) {
  try {
    await prisma.medicamento.delete({
      where: { CodMedicamento: parseInt(params.CodMedicamento) }
    });

    return NextResponse.json(
      { message: "Medicamento eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar medicamento" },
      { status: 500 }
    );
  }
}