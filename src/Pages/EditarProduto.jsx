// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarraNavegacao from "../components/BarraNavegacao";


const urlTipo = "http://localhost:5000/Tipos";

const EditarProduto = () => {
    const [tipos, setTipos] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const req = await fetch(urlTipo);
          const Tipos = await req.json();
          console.log(Tipos);
          setTipos(Tipos);
        } catch (erro) {
          console.log(erro.message);
        }
      }
      fetchData();
    }, []);

  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Bolo");
  const [preco, setPreco] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate();

  const params = window.location.pathname.split("/")
  const idProd = params[params.length - 1]

  useEffect(() => {
    async function fetchData() {
      try{
        const req = await fetch(`http://localhost:5000/Produtos/${idProd}`)
        const prod = await req.json()
        console.log(prod)
        setNome(prod.nome)
        setDescricao(prod.descricao)
        setTipo(prod.tipo)
        setPreco(prod.preco)
        setImagemUrl(prod.imagemUrl == "" ? "" : prod.imagemUrl)
      } 
      catch(error){
        console.log(error.message)
      }
    }
    fetchData()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nome != "") {
      if (descricao != "") {
        if (preco != "") {
          const produto = { nome, descricao, tipo, preco, imagemUrl };
          console.log(produto);
          try {
            const req = await fetch(`http://localhost:5000/Produtos/${idProd}`, {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(produto),
            });
            const res = req.json();
            console.log(res);
            setAlertClass("mb-3 mt-2");
            setAlertVariant("success");
            setAlertMensagem("Produto editado com sucesso");
            alert("Produto editado com sucesso");
            navigate("/home");
          } 
          catch (error) {
            console.log(error);
          }
        } 
        else {
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("O campo preço não pode ser vazio");
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo descrição não pode ser vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo nome não pode ser vazio");
    }
  };


  return (
    <div>
      <BarraNavegacao />
      <Container>
        <h1>Editar Produtos</h1>
        <form className="mt-3" onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <FloatingLabel
                controlId="floatingInputNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputDescricao"
                label="Descrição"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite a descrição do produto"
                  value={descricao}
                  onChange={(e) => {
                    setDescricao(e.target.value);
                  }}
                />
              </FloatingLabel>

              <Form.Group controlId="formGridTipo" className="mb-3">
                <Form.Label>Tipo de produto</Form.Label>
                <Form.Select
                  value={tipo}
                  onChange={(e) => {
                    setTipo(e.target.value);
                  }}
                >
                  {tipos.map((Tip) => (
                    <option key={Tip.id} value={Tip.nome}>
                      {Tip.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <FloatingLabel
                controlId="floatingInputPreco"
                label="Preço"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="Digite o preco"
                  value={preco}
                  onChange={(e) => {
                    setPreco(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                <FloatingLabel
                  controlId="floatingInputImagem"
                  label="Envie o link da imagem do produto"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Envie o link da imagem do produto"
                    value={imagemUrl}
                    onChange={(e) => {
                      setImagemUrl(e.target.value);
                    }}
                  />
                </FloatingLabel>

                <Image
                  src={imagemUrl == "" ? linkImagem : imagemUrl}
                  rounded
                  width={300}
                  height={300}
                />
              </Form.Group>
            </Col>
          </Row>

          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          <Button variant="primary" size="lg" type="submit">
            Editar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditarProduto;