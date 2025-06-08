'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NewMedicamento() {
  const router = useRouter();
  const [form, setForm] = useState({
    descripcionMed: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    Presentacion: '',
    stock: '',
    precioVentaUni: '',
    precioVentaPres: '',
    Marca: '',
    CodTipoMed: '',
    CodEspec: ''
  });
  const [tipos, setTipos] = useState<any[]>([]);
  const [especialidades, setEspecialidades] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/tipo-medic')
      .then(res => res.json())
      .then(setTipos);
      
    fetch('/api/especialidades')
      .then(res => res.json())
      .then(setEspecialidades);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/medicamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          stock: parseInt(form.stock),
          precioVentaUni: parseFloat(form.precioVentaUni),
          precioVentaPres: parseFloat(form.precioVentaPres),
          CodTipoMed: parseInt(form.CodTipoMed),
          CodEspec: parseInt(form.CodEspec)
        }),
      });

      if (response.ok) {
        router.push('/medicamentos');
      } else {
        alert('Error al crear el medicamento');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Registrar Nuevo Medicamento</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <input
              type="text"
              required
              value={form.descripcionMed}
              onChange={e => setForm({...form, descripcionMed: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input
              type="text"
              value={form.Marca}
              onChange={e => setForm({...form, Marca: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Fabricación</label>
            <input
              type="date"
              required
              value={form.fechaFabricacion}
              onChange={e => setForm({...form, fechaFabricacion: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Vencimiento</label>
            <input
              type="date"
              required
              value={form.fechaVencimiento}
              onChange={e => setForm({...form, fechaVencimiento: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Presentación</label>
            <input
              type="text"
              required
              value={form.Presentacion}
              onChange={e => setForm({...form, Presentacion: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              required
              min="0"
              value={form.stock}
              onChange={e => setForm({...form, stock: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Precio Unitario</label>
            <input
              type="number"
              required
              step="0.01"
              min="0"
              value={form.precioVentaUni}
              onChange={e => setForm({...form, precioVentaUni: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Precio Presentación</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.precioVentaPres}
              onChange={e => setForm({...form, precioVentaPres: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Medicamento</label>
            <select
              required
              value={form.CodTipoMed}
              onChange={e => setForm({...form, CodTipoMed: e.target.value})}
              className="w-full border rounded p-2"
            >
              <option value="">Seleccionar...</option>
              {tipos.map(tipo => (
                <option key={tipo.CodTipoMed} value={tipo.CodTipoMed}>
                  {tipo.descripcion}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Especialidad</label>
            <select
              required
              value={form.CodEspec}
              onChange={e => setForm({...form, CodEspec: e.target.value})}
              className="w-full border rounded p-2"
            >
              <option value="">Seleccionar...</option>
              {especialidades.map(esp => (
                <option key={esp.CodEspec} value={esp.CodEspec}>
                  {esp.descripcionEsp}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => router.push('/medicamentos')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar Medicamento
          </button>
        </div>
      </form>
    </div>
  );
}