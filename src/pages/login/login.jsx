import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0597FA;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0597FA;
    box-shadow: 0 0 0 2px rgba(5, 151, 250, 0.2);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0597FA;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0477c8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #0597FA;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.span`
  color: #ff3333;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.8rem;
  text-decoration: none;
  
  &:hover {
    color: #0597FA;
    text-decoration: underline;
  }
`;

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Recupera a lista de empresas do localStorage
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      
      // Procura a empresa com o email e senha fornecidos
      const company = companies.find(
        company => company.email === formData.email && company.password === formData.password
      );

      if (company) {
        // Salva os dados da empresa logada
        localStorage.setItem('loggedCompany', JSON.stringify(company));
        alert('Login realizado com sucesso!');
        navigate('/dashboard'); // Redireciona para o dashboard
      } else {
        alert('Email ou senha incorretos!');
      }
    } catch (error) {
      alert('Erro ao realizar login. Por favor, tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Login</Title>
        
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <ForgotPassword to="/forgot-password">
            Esqueceu a senha?
          </ForgotPassword>
        </FormGroup>

        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </LoginButton>

        <StyledLink to="/cadastro">
          Ainda não tem uma conta? Cadastre-se
        </StyledLink>
      </FormContainer>
    </PageContainer>
  );
};