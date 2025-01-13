import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home }  from "../pages/home/home.jsx";
import { Cadastro } from "../pages/cadastro/cadastro.jsx";
import { Login } from "../pages/login/login.jsx";



export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login"  element={<Login />} />
        
    
      </Routes>
    </BrowserRouter>
  );
};