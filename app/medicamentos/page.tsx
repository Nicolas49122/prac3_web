'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Medicamento {
  CodMedicamento: number;
  descripcionMed: string;
  precioVentaUni: number;
  stock: number;
  Presentacion: string;
  tipoMedic: {
    descripcion: string;
  };
  especialidad: {
    descripcionEsp: string;
  };
}

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  
  useEffect(() => {
    fetch('/api/medicamentos')
      .then(res => res.json())
      .then(setMedicamentos);
  }, []);

  const eliminar = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este medicamento?')) return;
    
    await fetch(`/api/medicamentos/${id}`, {
      method: 'DELETE',
    });
    setMedicamentos(medicamentos.filter(m => m.CodMedicamento !== id));
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Inventario de Medicamentos</h1>
      <Link 
        href="/medicamentos/new" 
        className='bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block'
      >
        Nuevo Medicamento
      </Link>
      
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded shadow'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 text-left'>#</th>
              <th className='px-4 py-2 text-left'>Medicamento</th>
              <th className='px-4 py-2 text-left'>Precio Unit.</th>
              <th className='px-4 py-2 text-left'>Stock</th>
              <th className='px-4 py-2 text-left'>Presentación</th>
              <th className='px-4 py-2 text-left'>Tipo</th>
              <th className='px-4 py-2 text-left'>Especialidad</th>
              <th className='px-4 py-2 text-left'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((m, i) => (
              <tr key={m.CodMedicamento} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-2'>{i + 1}</td>
                <td className='px-4 py-2'>{m.descripcionMed}</td>
                <td className='px-4 py-2'>S/. {m.precioVentaUni.toFixed(2)}</td>
                <td className='px-4 py-2'>{m.stock}</td>
                <td className='px-4 py-2'>{m.Presentacion}</td>
                <td className='px-4 py-2'>{m.tipoMedic?.descripcion || 'N/A'}</td>
                <td className='px-4 py-2'>{m.especialidad?.descripcionEsp || 'N/A'}</td>
                <td className='px-4 py-2 space-x-2'>
                  <Link 
                    href={`/medicamentos/${m.CodMedicamento}/edit`} 
                    className='text-blue-500 hover:underline'
                  >
                    Editar
                  </Link>
                  <button 
                    onClick={() => eliminar(m.CodMedicamento)} 
                    className='text-red-500 hover:underline'
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {medicamentos.length === 0 && (
              <tr>
                <td colSpan={8} className='px-4 py-2 text-center text-gray-500'>
                  No hay medicamentos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}