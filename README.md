## Short URL - Acortador de Enlaces 🚀

Short URL es una aplicación web que permite acortar enlaces y administrarlos de manera sencilla. Utiliza Firebase como backend y un stack moderno con React.js y TailwindCSS en el frontend.

## 📌 Funcionalidades

✔️ Acortar URLs y generar identificadores únicos.
✔️ Administrar y eliminar enlaces desde un panel de control.
✔️ Autenticación con correo/contraseña y Google.
✔️ Verificación de email y recuperación de contraseña.

## 🛠 Tecnologías Utilizadas

✔️ Vite - Entorno de desarrollo para React.
✔️ React.js - Biblioteca para construir interfaces de usuario.
✔️ Firebase - Backend como servicio, usado para autenticación y base de datos.
✔️ Tailwind CSS - Framework de CSS para estilos responsivos.
✔️ Flowbite - Componentes preconstruidos con TailwindCSS.
✔️ React Router DOM - Manejo de rutas en React.
✔️ React Hook Form - Manejo de formularios en React.
✔️ SweetAlert2 - Alertas y notificaciones amigables.
✔️ React Icons - Conjunto de íconos para la interfaz.

## ⚙️ Configuración de Firebase

1️⃣ Crear el Proyecto en Firebase
1. Ir a Firebase Console.
2. Crear un nuevo proyecto y configurarlo.
3. En la sección "Authentication", habilitar: 
   ● Correo y contraseña
   ● Google
4. Para permitir el envío de verificación de email y recuperación de contraseña:
   ● Ir a Authentication > Configuración
   ● En la pestaña "Acciones del usuario", deshabilitar "Protección de enumeración de correo electrónico".

2️⃣ Configurar Firestore Database
1. Ir a "Firestore Database" en la consola de Firebase.
2. Crear una nueva base de datos en modo Producción o Pruebas.
3. Crear una colección llamada "urls" con los siguientes atributos:
   ● enabled (boolean): Indica si la URL está activa.
   ● nanoid (string): Id de la URL.
   ● origin (string): URL original antes de ser acortada.
   ● uid (string): Id del usuario propietario de la URL.

3️⃣ Obtener Credenciales de Firebase
1. Ir a "Configuración de proyecto".
2. Buscar el apartado "SDK de configuración" de Firebase.
3. Copiar las credenciales de configuración.
4. Crear un archivo .env en la raíz del proyecto y agregar lo siguiente: 
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
5. Completar los valores con las credenciales copiadas de Firebase.

## Instalación y Ejecución del Proyecto
🔄 Clonar el Repositorio
```bash
git clone https://gitlab.com/username/reactjs-project.git
cd short-url
```
📦 Instalar Dependencias
```bash
npm install
```
▶️ Ejecutar el Proyecto
```bash
npm run dev
```