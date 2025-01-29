import { Route, Routes } from "react-router-dom";

import LayoutRequireAuth from "../components/layouts/LayoutRequireAuth";
import LayoutContainer from "../components/layouts/LayoutContainer";
import LayoutRedirect from "../components/layouts/LayoutRedirect";

import Navbar from "../components/Navbar";
import Home from "../pages/home/Home";
import Perfil from "../pages/Perfil";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Login from "../pages/login/Login";

const RootRouter = () => {
  return (
    <>
      <Navbar />
      {/* Rutas privadas */}
      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Rutas públicas */}
        <Route path="/" element={<LayoutContainer />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas de redirección */}
        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default RootRouter;
