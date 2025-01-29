import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          ¡Ups! La página que estás buscando no parece existir.
        </p>
        <Link
          to="/"
          className="bg-[#AB23D8] hover:bg-[#9B20C5] text-white font-bold py-2 px-4 rounded"
        >
          Regresar al Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
