import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';

const CardProdutos = (props) => {
  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/Produtos/${props.id}`, 
    {method:"DELETE"});
    const res = await req.json();
    console.log(res);
    alert(`Produto ${res.nome} removido`);
  };

  return (
    <div className="mb-4">
      <Card style={{ width: "20rem", height: "32rem", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <Card.Img variant="top" src={props.imagemUrl} height="200px" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }} />
        <Card.Body className="text-center" style={{ backgroundColor: "#f8f9fa" }}>
          <Card.Title style={{ fontSize: "1.5rem", color: "#d63384" }}>{props.nome}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: "1.2rem" }}>
            Preço: R$ <span style={{ fontWeight: "bold", color: "#28a745" }}>{props.preco}</span>
          </Card.Subtitle>
          <Card.Text>
            <b>Descrição:</b> <br /> {props.descricao}
          </Card.Text>
          <Card.Text>
            <b>Tipo:</b> <br /> {props.tipo}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Card.Link href={`/produto/Editar/${props.id}`}>
              <Button variant="warning">Editar</Button>
            </Card.Link>
            <Card.Link>
              <Button variant="danger" type="button" onClick={handleDelete}>
                Excluir
              </Button>
            </Card.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProdutos;