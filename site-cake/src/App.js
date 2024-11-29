import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CadastrarProduto from './Pages/CadastrarProduto'
import EditarProduto from './Pages/EditarProduto'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cadastro from './Pages/Cadastro'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Cadastrar" element={<Cadastro />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/produto/Cadastrar" element={<CadastrarProduto />}/>
        <Route path="/produto/Editar/:id" element={<EditarProduto />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
