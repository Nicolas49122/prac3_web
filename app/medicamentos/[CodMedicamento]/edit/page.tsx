'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditMedicamento() {
  const router = useRouter();
  const params = useParams();
  const CodMedicamento = params.CodMedicamento as string;
  
  const [medicamento, setMedicamento] = useState<any>(null);
  const [tipos, setTipos] = useState<any[]>([]);
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar datos del medicamento (excluyendo relaciones)
    fetch(`/api/medicamentos/${CodMedicamento}`)
      .then(res => res.json())
      .then(data => {
        // Eliminar objetos anidados que no necesitamos en el formulario
        const { tipoMedic, especialidad, ...cleanData } = data;
        
        if (cleanData.fechaFabricacion) {
          cleanData.fechaFabricacion = cleanData.fechaFabricacion.split('T')[0];
        }
        if (cleanData.fechaVencimiento) {
          cleanData.fechaVencimiento = cleanData.fechaVencimiento.split('T')[0];
        }
        setMedicamento(cleanData);
      })
      .catch(error => {
        console.error('Error cargando medicamento:', error);
        setError('Error al cargar datos del medicamento');
      });
      
    // Cargar tipos y especialidades
    fetch('/api/tipo-medic')
      .then(res => res.json())
      .then(setTipos);
      
    fetch('/api/especialidades')
      .then(res => res.json())
      .then(setEspecialidades);
  }, [CodMedicamento]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Preparar datos limpios para enviar
      const payload = {
        descripcionMed: medicamento.descripcionMed,
        fechaFabricacion: medicamento.fechaFabricacion,
        fechaVencimiento: medicamento.fechaVencimiento,
        Presentacion: medicamento.Presentacion,
        stock: parseInt(medicamento.stock),
        precioVentaUni: parseFloat(medicamento.precioVentaUni),
        precioVentaPres: parseFloat(medicamento.precioVentaPres),
        Marca: medicamento.Marca,
        CodTipoMed: parseInt(medicamento.CodTipoMed),
        CodEspec: parseInt(medicamento.CodEspec)
      };

      const response = await fetch(`/api/medicamentos/${CodMedicamento}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        router.push('/medicamentos');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!medicamento) return <div className="p-4">Cargando...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Medicamento</h1>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <input
              type="text"
              required
              value={medicamento.descripcionMed}
              onChange={e => setMedicamento({...medicamento, descripcionMed: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input
              type="text"
              value={medicamento.Marca}
              onChange={e => setMedicamento({...medicamento, Marca: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Fabricación</label>
            <input
              type="date"
              required
              value={medicamento.fechaFabricacion}
              onChange={e => setMedicamento({...medicamento, fechaFabricacion: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Vencimiento</label>
            <input
              type="date"
              required
              value={medicamento.fechaVencimiento}
              onChange={e => setMedicamento({...medicamento, fechaVencimiento: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Presentación</label>
            <input
              type="text"
              required
              value={medicamento.Presentacion}
              onChange={e => setMedicamento({...medicamento, Presentacion: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              required
              min="0"
              value={medicamento.stock}
              onChange={e => setMedicamento({...medicamento, stock: e.target.value})}
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
              value={medicamento.precioVentaUni}
              onChange={e => setMedicamento({...medicamento, precioVentaUni: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Precio Presentación</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={medicamento.precioVentaPres}
              onChange={e => setMedicamento({...medicamento, precioVentaPres: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Medicamento</label>
            <select
              required
              value={medicamento.CodTipoMed}
              onChange={e => setMedicamento({...medicamento, CodTipoMed: e.target.value})}
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
              value={medicamento.CodEspec}
              onChange={e => setMedicamento({...medicamento, CodEspec: e.target.value})}
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
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Actualizando...' : 'Actualizar Medicamento'}
          </button>
        </div>
      </form>
    </div>
  );
}