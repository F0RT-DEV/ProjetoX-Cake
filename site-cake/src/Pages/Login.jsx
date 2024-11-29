import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import './Login.css';

const url = "http://localhost:5000/usuarios"

const Login = () => {
  
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const [usuarios, setUsuarios] = useState([])

  useEffect(()=>{
    async function fetchData(){
      try{
          const req = await fetch(url)
          const users = await req.json()
          console.log(users)
          setUsuarios(users)
      }
      catch(erro){
        console.log(erro.message)
      }
    }
    fetchData()
  }, [])

  const navigate = useNavigate()

  const gravarLocalStorage = (usuario) =>{
    localStorage.setItem("userName", usuario.nome)
    localStorage.setItem("email", usuario.email)
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const userToFind = usuarios.find(
      (user)=>user.email === email
    )
    if (email != "") {
      if (senha != "") {
        if(userToFind != undefined && userToFind.senha == senha){
          gravarLocalStorage(userToFind)
          setAlertClass("mb-3 mt-2");
          setAlertVariant("success")
          setAlertMensagem("Login efetuado com sucesso");
          alert("Login efetuado com sucesso")
          navigate("/home")
        }
        else{
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("Usuário ou senha inválidos");
        }
      } 
      else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo senha não pode ser vazio");
      }
    } 
    else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo email não pode ser vazio");
    }
}
  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh",}}>
        <div className="login-form">
          <i className="bi bi-box-arrow-in-right" style={{ fontSize: "100px", marginBottom: "20px", color: "#007bff", marginLeft:"159px"}}></i>
          <h2 className="icons mb-4">Seja bem vindo!</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign:"left"}}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" required style={{textAlign:"center"}}
              value={email} onChange={(e) => { setEmail(e.target.value);}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign:"left"}}>
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" required style={{textAlign:"center"}}
                value={senha}onChange={(e) => {setSenha(e.target.value);}}/>
            </Form.Group>
            <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
            </Alert>
            <Button variant="primary" type="submit" className="btn2">
              Entrar
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>Não possui conta? <a href="/Cadastrar">Então cadastre-se logo ai</a></p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;