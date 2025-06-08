'use client';

import Link from 'next/link';
import { useState } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  return (
    <html lang="es">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="hover:underline">Inicio</Link>
            </li>
            <li>
              <button onClick={() => toggleMenu('medicamentos')} className="focus:outline-none">
                Medicamentos
              </button>
              {openMenu === 'medicamentos' && (
                <ul className="bg-gray-700 p-2 rounded mt-2 absolute z-10">
                  <li>
                    <Link href="/medicamentos" className="block hover:underline">Lista de Medicamentos</Link>
                  </li>
                  <li>
                    <Link href="/medicamentos/new" className="block hover:underline">Nuevo Medicamento</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => toggleMenu('especialidades')} className="focus:outline-none">
                Especialidades
              </button>
              {openMenu === 'especialidades' && (
                <ul className="bg-gray-700 p-2 rounded mt-2 absolute z-10">
                  <li>
                    <Link href="/especialidades" className="block hover:underline">Lista de Especialidades</Link>
                  </li>
                  <li>
                    <Link href="/especialidades/new" className="block hover:underline">Nueva Especialidad</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => toggleMenu('tipos')} className="focus:outline-none">
                Tipos de Medicamento
              </button>
              {openMenu === 'tipos' && (
                <ul className="bg-gray-700 p-2 rounded mt-2 absolute z-10">
                  <li>
                    <Link href="/tipo-medic" className="block hover:underline">Lista de Tipos</Link>
                  </li>
                  <li>
                    <Link href="/tipo-medic/new" className="block hover:underline">Nuevo Tipo</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}