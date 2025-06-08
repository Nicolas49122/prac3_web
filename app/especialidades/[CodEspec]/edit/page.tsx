'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditEspecialidad() {
  const router = useRouter();
  const params = useParams();
  const CodEspec = params.CodEspec as string;

  const [especialidad, setEspecialidad] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/especialidades/${CodEspec}`)
      .then(res => res.json())
      .then(data => setEspecialidad(data))
      .catch(() => setError('Error al cargar la especialidad'));
  }, [CodEspec]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        descripcionEsp: especialidad.descripcionEsp
      };

      const response = await fetch(`/api/especialidades/${CodEspec}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        router.push('/especialidades');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!especialidad) return <div className="p-4">Cargando...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Especialidad</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <input
            type="text"
            required
            value={especialidad.descripcionEsp}
            onChange={e => setEspecialidad({ ...especialidad, descripcionEsp: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => router.push('/especialidades')}
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
            {isSubmitting ? 'Actualizando...' : 'Actualizar Especialidad'}
          </button>
        </div>
      </form>
    </div>
  );
}