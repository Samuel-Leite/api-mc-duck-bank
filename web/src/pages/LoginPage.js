import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
// import "../styles/Login.css";
import mcduckLogo from "../assets/images/mcduck-logo-2.png";
import axios from "axios";
import Modal from "../components/Modal";
import AuthPanel from "../components/AuthPanel";

const LoginPage = () => {
  const navigate = useNavigate(); // Inicializa o useNavigate
  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    cpf: "",
    email: "",
    address: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    cpf: "",
    password: "",
  });

  const [modal, setModal] = useState({ message: "", isVisible: false });

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setIsTransitioning(false);
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log("Dados do formulário de cadastro:", formData);

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", formData);
      console.log("Usuário cadastrado com sucesso:", response.data);
      
      if (response.status === 201) {
        setModal({ message: response.data.message, isVisible: true });
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setModal({
        message: error.response?.data?.error || "Erro ao cadastrar usuário.",
        isVisible: true,
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Dados do formulário de login:", loginData);

    try {
      const response = await axios.post("http://localhost:3000/auth/login", loginData);
      console.log("Usuário logado com sucesso:", response.data);
      
      if (response.status === 200) {
        setModal({ message: "Login bem-sucedido!", isVisible: true });
        navigate("/home"); // Redireciona para a página inicial
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setModal({
        message: error.response?.data?.error || "Erro ao fazer login.",
        isVisible: true,
      });
    }
  };

  const closeModal = () => {
    setModal({ ...modal, isVisible: false });
    setFormData({ username: "", cpf: "", email: "", address: "", password: "" });
    setLoginData({ cpf: "", password: "" }); // Corrigido para limpar o CPF
  };

  return (
    <div className={`login-container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="login-logo-container">
        <img src={mcduckLogo} alt="McDuck Bank Logo" className="login-logo logo-left" />
        <img src={mcduckLogo} alt="McDuck Bank Logo" className="login-logo logo-right" />
      </div>

      <div className="login-forms-container">
        <div className="panels-container">
          <div className={`panel left-panel ${isTransitioning ? "transition" : ""}`}>
            <div className="content">
              <h3>Create your McDuck Bank Account</h3>
              <p>Welcome to McDuck Bank! Join us today to manage your finances effortlessly and securely.</p>
              <button className="btn-login transparent" onClick={handleToggle}>
                Sign up
              </button>
            </div>
          </div>
          <div className={`panel right-panel ${isTransitioning ? "transition" : ""}`}>
            <div className="content">
              <h3>Already have an account?</h3>
              <p>Welcome back to McDuck Bank! Log in to securely manage your finances and enjoy our banking services.</p>
              <button className="btn-login transparent" onClick={handleToggle}>
                Sign in
              </button>
            </div>
          </div>
        </div>

        <AuthPanel
          isSignUp={isSignUp}
          formData={isSignUp ? formData : loginData} // Usando loginData para login
          onChange={isSignUp ? handleChange : handleLoginChange}
          onSubmit={isSignUp ? handleSubmitForm : handleLogin} // Chamando handleLogin para login
        />
      </div>

      <Modal
        isVisible={modal.isVisible}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  );
};

export default LoginPage;
