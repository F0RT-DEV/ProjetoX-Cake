import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import Container from 'react-bootstrap/Container';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cadastro.css';

const url = "http://localhost:5000/usuarios";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("Todos os campos são obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("As senhas não coincidem.");
      return;
    }

    const novoUsuario = {
      nome,
      email,
      senha,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMensagem("Cadastro realizado com sucesso!");
        setTimeout(() => {
        navigate("/login");
        }, 2000);
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.log(error);
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="cadastro-background">
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="cadastro-form p-4 shadow rounded bg-light">
          <h2 className="mb-4 text-center">Cadastro</h2>
          <Form onSubmit={handleCadastro}>
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome completo" required
                value={nome} onChange={(e) => { setNome(e.target.value); }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" required
                value={email} onChange={(e) => { setEmail(e.target.value); }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" required
                value={senha} onChange={(e) => { setSenha(e.target.value); }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmarSenha">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control type="password" placeholder="Confirme sua senha" required
                value={confirmarSenha} onChange={(e) => { setConfirmarSenha(e.target.value); }} />
            </Form.Group>

            <Alert variant={alertVariant} className={alertClass}>
              {alertMensagem}
            </Alert>
            <Button variant="primary" type="submit" className="btn1">
              Cadastrar
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>Já tem uma conta? <a href="/login">Faça login</a></p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Cadastro;