import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const medicamentos = await prisma.medicamento.findMany({
      include: {
        tipoMedic: true,
        especialidad: true
      }
    });
    return NextResponse.json(medicamentos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener medicamentos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const camposRequeridos = [
      'descripcionMed', 'fechaFabricacion', 'fechaVencimiento',
      'Presentacion', 'stock', 'precioVentaUni', 'precioVentaPres',
      'Marca', 'CodTipoMed', 'CodEspec'
    ];
    
    const faltantes = camposRequeridos.filter(campo => !data[campo]);
    
    if (faltantes.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${faltantes.join(', ')}` },
        { status: 400 }
      );
    }

    const medicamento = await prisma.medicamento.create({
      data: {
        descripcionMed: data.descripcionMed,
        fechaFabricacion: new Date(data.fechaFabricacion),
        fechaVencimiento: new Date(data.fechaVencimiento),
        Presentacion: data.Presentacion,
        stock: parseInt(data.stock),
        precioVentaUni: parseFloat(data.precioVentaUni),
        precioVentaPres: parseFloat(data.precioVentaPres),
        Marca: data.Marca,
        CodTipoMed: parseInt(data.CodTipoMed),
        CodEspec: parseInt(data.CodEspec)
      },
      include: {
        tipoMedic: true,
        especialidad: true
      }
    });

    return NextResponse.json(medicamento, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear medicamento" },
      { status: 500 }
    );
  }
}