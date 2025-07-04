'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewTipoMedicamento() {
  const router = useRouter();
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = { descripcion };

      const response = await fetch('/api/tipo-medic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        router.push('/tipo-medic');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear tipo de medicamento');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nuevo Tipo de Medicamento</h1>

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
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => router.push('/tipo-medic')}
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
            {isSubmitting ? 'Creando...' : 'Crear Tipo'}
          </button>
        </div>
      </form>
    </div>
  );
}