# Sistema de Gestión de Farmacia

Este proyecto es una aplicación web construida con [Next.js](https://nextjs.org) para la gestión de medicamentos, especialidades y tipos de medicamento en una farmacia.

## Requisitos Previos

- Node.js 18 o superior
- npm, yarn, pnpm o bun
- Una base de datos compatible con Prisma (por ejemplo, MySQL, PostgreSQL o SQLite)

## Instalación y Ejecución Local

1. **Clona el repositorio y entra en la carpeta del proyecto:**

   ```bash
   git clone <url-del-repositorio>
   cd prac3_web
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configura la base de datos:**

   - Crea un archivo `.env` en la raíz del proyecto y agrega tu cadena de conexión de base de datos, por ejemplo:
     ```
     DATABASE_URL="mysql://usuario:contraseña@localhost:3306/tu_basededatos"
     ```
   - Ejecuta las migraciones de Prisma para crear las tablas:
     ```bash
     npx prisma migrate dev
     ```

4. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

5. **Abre la aplicación en tu navegador:**

   Visita [http://localhost:3000](http://localhost:3000)

---