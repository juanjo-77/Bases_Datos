# 🚀 API REST — Express + PostgreSQL

API REST construida con Node.js y Express que conecta a PostgreSQL. Maneja doctores, acudientes y usuarios con sus respectivas operaciones CRUD.

---

## 📦 Tecnologías usadas

- **Node.js** — entorno de ejecución
- **Express** — framework para crear el servidor y las rutas
- **PostgreSQL** — base de datos relacional
- **pg** — librería para conectar Node.js con PostgreSQL
- **dotenv** — manejo de variables de entorno
- **cors** — permite peticiones desde otros dominios

---

## 🗂️ Estructura del proyecto

```
proyecto/
├── .env                          ← variables de entorno (no subir a GitHub)
├── .gitignore
├── package.json
└── src/
    ├── server.js                 ← arranca el servidor
    ├── app.js                    ← configura Express y las rutas
    ├── config/
    │   └── database/
    │       └── pgconfig.js       ← conexión a PostgreSQL
    ├── errors/
    │   └── HttpError.js          ← clase de error personalizada
    ├── routes/
    │   ├── usuarios.routes.js
    │   ├── doctores.routes.js
    │   └── acudientes.routes.js
    ├── controllers/
    │   ├── usuarios.controller.js
    │   ├── doctores.controller.js
    │   └── acudientes.controller.js
    └── services/
        ├── usuarios.service.js
        ├── doctores.service.js
        └── acudientes.service.js
```

---

## ⚙️ Instalación

### 1. Clonar o descomprimir el proyecto

```bash
cd proyecto
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz con estos datos:

```env
APP_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mi_api
DB_USER=postgres
DB_PASSWORD=tu_contraseña
```

### 4. Crear las tablas en PostgreSQL

Ejecuta este SQL en DBeaver o pgAdmin:

```sql
-- Tabla especialidades (se crea primero porque doctores depende de ella)
CREATE TABLE especialidades (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- Tabla doctores (conectada a especialidades por FK)
CREATE TABLE doctores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  edad INT NOT NULL,
  especialidad_id INT REFERENCES especialidades(id)
);

-- Tabla acudientes
CREATE TABLE acudientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  edad INT NOT NULL
);

-- Tabla usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  edad INT NOT NULL
);

-- Procedimiento para insertar doctor
CREATE OR REPLACE PROCEDURE insertar_doctor(
  p_nombre VARCHAR, p_apellido VARCHAR,
  p_email VARCHAR, p_edad INT, p_especialidad_id INT
)
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO doctores (nombre, apellido, email, edad, especialidad_id)
  VALUES (p_nombre, p_apellido, p_email, p_edad, p_especialidad_id);
END;
$$;

-- Procedimiento para insertar acudiente
CREATE OR REPLACE PROCEDURE insertar_acudiente(
  p_nombre VARCHAR, p_apellido VARCHAR,
  p_email VARCHAR, p_edad INT
)
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO acudientes (nombre, apellido, email, edad)
  VALUES (p_nombre, p_apellido, p_email, p_edad);
END;
$$;

-- Procedimiento para insertar usuario
CREATE OR REPLACE PROCEDURE insertar_usuario(
  p_nombre VARCHAR, p_apellido VARCHAR,
  p_email VARCHAR, p_edad INT
)
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO usuarios (nombre, apellido, email, edad)
  VALUES (p_nombre, p_apellido, p_email, p_edad);
END;
$$;
```

### 5. Correr el servidor

```bash
npm run dev
```

Deberías ver:
```
✅ PostgreSQL conectado
🚀 Servidor corriendo en http://localhost:3000
```

---

## 📡 Endpoints

### Usuarios `/usuarios`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/usuarios` | Listar todos los usuarios |
| POST | `/usuarios` | Crear un usuario |
| PUT | `/usuarios/:id` | Actualizar un usuario |
| DELETE | `/usuarios/:id` | Eliminar un usuario |

**Body para POST y PUT:**
```json
{
  "nombre": "maria",
  "apellido": "lopez",
  "email": "maria@gmail.com",
  "edad": 25
}
```

---

### Doctores `/doctores`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/doctores` | Listar todos los doctores con su especialidad |
| POST | `/doctores` | Crear un doctor |
| PUT | `/doctores/:id` | Actualizar un doctor |
| DELETE | `/doctores/:id` | Eliminar un doctor |

**Body para POST y PUT:**
```json
{
  "nombre": "carlos",
  "apellido": "lopez",
  "email": "carlos@gmail.com",
  "edad": 35,
  "especialidad_id": 1
}
```

---

### Acudientes `/acudientes`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/acudientes` | Listar todos los acudientes |
| POST | `/acudientes` | Crear un acudiente |
| PUT | `/acudientes/:id` | Actualizar un acudiente |
| DELETE | `/acudientes/:id` | Eliminar un acudiente |

**Body para POST y PUT:**
```json
{
  "nombre": "pedro",
  "apellido": "ramirez",
  "email": "pedro@gmail.com",
  "edad": 28
}
```

---

## 🗄️ Diagrama de base de datos (ERD)

```
┌──────────────────┐        ┌─────────────────────┐
│  especialidades  │        │      doctores        │
├──────────────────┤        ├─────────────────────┤
│ id (PK)          │◄───────│ id (PK)             │
│ nombre           │        │ nombre              │
└──────────────────┘        │ apellido            │
                            │ email               │
                            │ edad                │
                            │ especialidad_id (FK)│
                            └─────────────────────┘

┌─────────────────────┐     ┌─────────────────────┐
│      usuarios       │     │     acudientes       │
├─────────────────────┤     ├─────────────────────┤
│ id (PK)             │     │ id (PK)             │
│ nombre              │     │ nombre              │
│ apellido            │     │ apellido            │
│ email               │     │ email               │
│ edad                │     │ edad                │
└─────────────────────┘     └─────────────────────┘
```

---

## 🔄 Flujo de una petición

```
Thunder Client / Postman
        ↓
    Routes  →  define el endpoint y el método HTTP
        ↓
    Controller  →  recibe req, devuelve res
        ↓
    Service  →  lógica + queries a la DB
        ↓
    PostgreSQL
```

---

## 💡 Conceptos clave

**Pool** — maneja múltiples conexiones a PostgreSQL sin abrir/cerrar una por cada query.

**Procedimiento almacenado** — SQL guardado en la DB, se llama con `CALL nombre($1, $2)`. Más seguro y reutilizable que queries directos.

**FK (Foreign Key)** — columna que referencia la PK de otra tabla. En este proyecto `especialidad_id` en doctores apunta a `id` en especialidades.

**JOIN** — une dos tablas en una consulta para ver datos relacionados juntos.

**Normalización** — separar datos repetidos en tablas propias para evitar redundancia.
