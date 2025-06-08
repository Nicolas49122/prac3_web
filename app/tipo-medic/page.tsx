'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TipoMedicPage() {
  const [tipos, setTipos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/tipo-medic')
      .then(res => res.json())
      .then(data => setTipos(data))
      .catch(() => setError('Error al cargar tipos de medicamento'))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (CodTipoMed: number) => {
    router.push(`/tipo-medic/${CodTipoMed}/edit`);
  };

  const handleDelete = async (CodTipoMed: number) => {
    if (!confirm('¿Seguro que deseas eliminar este tipo de medicamento?')) return;
    try {
      const res = await fetch(`/api/tipo-medic/${CodTipoMed}`, { method: 'DELETE' });
      if (res.ok) {
        setTipos(tipos.filter(t => t.CodTipoMed !== CodTipoMed));
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Error al eliminar');
      }
    } catch {
      setError('Error al eliminar');
    }
  };

  if (loading) return <div className="p-4">Cargando...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tipos de Medicamento</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push('/tipo-medic/new')}
        >
          Nuevo Tipo
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">No hay tipos registrados.</td>
            </tr>
          ) : (
            tipos.map(tipo => (
              <tr key={tipo.CodTipoMed}>
                <td className="p-2 border">{tipo.CodTipoMed}</td>
                <td className="p-2 border">{tipo.descripcion}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(tipo.CodTipoMed)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(tipo.CodTipoMed)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}