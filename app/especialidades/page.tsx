'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/especialidades')
      .then(res => res.json())
      .then(data => setEspecialidades(data))
      .catch(() => setError('Error al cargar especialidades'))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (CodEspec: number) => {
    router.push(`/especialidades/${CodEspec}/edit`);
  };

  const handleDelete = async (CodEspec: number) => {
    if (!confirm('¿Seguro que deseas eliminar esta especialidad?')) return;
    try {
      const res = await fetch(`/api/especialidades/${CodEspec}`, { method: 'DELETE' });
      if (res.ok) {
        setEspecialidades(especialidades.filter(e => e.CodEspec !== CodEspec));
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
        <h1 className="text-2xl font-bold">Especialidades</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push('/especialidades/new')}
        >
          Nueva Especialidad
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
          {especialidades.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">No hay especialidades registradas.</td>
            </tr>
          ) : (
            especialidades.map(esp => (
              <tr key={esp.CodEspec}>
                <td className="p-2 border">{esp.CodEspec}</td>
                <td className="p-2 border">{esp.descripcionEsp}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(esp.CodEspec)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(esp.CodEspec)}
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