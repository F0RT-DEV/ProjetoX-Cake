import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const BarraNavegacao = () => {
  const usuarioNome = localStorage.getItem("userName");
    return (
    <div>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
        <img 
            src="/ForteBolo.webp" 
            alt="Logo" 
            style={{height:"50px", marginRight:"15px",objectFit:"contain"}}
          />

          <Navbar.Toggle aria-controls="minha-nav" />
          <Navbar.Collapse id="minha-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className="active">Home</Nav.Link>
              <Nav.Link href="/produto/Cadastrar">Cadastrar produto</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Navbar.Text style={{color:"white"}}>
                Usuário: {usuarioNome} |
              </Navbar.Text>
              <Nav.Link href="/login" >Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default BarraNavegacao;