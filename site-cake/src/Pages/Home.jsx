// importando components do bootstrap
import React from "react";
import CardProdutos from '../components/CardProdutos';
import BarraNavegacao from "../components/BarraNavegacao";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
const url = "http://localhost:5000/Produtos"

const Home = () => {
    const [produtos, setProdutos] = useState([])
    useEffect(()=>{
      async function fetchData(){
        try{
            const req = await fetch(url)
            const prods = await req.json()
            console.log(prods)
            setProdutos(prods)
        }
        catch(erro){
          console.log(erro.message)
        }
      }
      fetchData()
    }, [produtos])
  
  return (
    <div>
    <BarraNavegacao />
      <h1 style={{textAlign:"center", marginTop:"50px", alignItems:"center"}}>Lista de produtos</h1>
      <Container style={{marginTop:"70px"}}>
        <div className="lista-produtos d-flex col-12 gap-5 mt-12 justify-content-center flex-wrap" style={{color:"#ffcbdb"}}>
          {produtos.map((prod) => (
            <CardProdutos
              key={prod.id}
              id={prod.id}
              nome={prod.nome}
              descricao={prod.descricao}
              preco={prod.preco}
              tipo={prod.tipo}
              imagemUrl={prod.imagemUrl}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;