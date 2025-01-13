import  { useState } from 'react';
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
  max-width: 500px;
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

const SubmitButton = styled.button`
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

export const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    telefone: '',
    cnpj: '',
    email: '',
    endereco: '',
    password: '',
    nameRes: '',
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.nameRes.trim()) {
      newErrors.nameRes = 'Nome do responsável é obrigatório';
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
      // Verifica se já existe uma lista de empresas
      const existingCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
      
      // Verifica se o email já está cadastrado
      if (existingCompanies.some(company => company.email === formData.email)) {
        alert('Este email já está cadastrado!');
        setIsLoading(false);
        return;
      }

      // Adiciona a nova empresa à lista
      const updatedCompanies = [...existingCompanies, formData];
      
      // Salva no localStorage
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      
      alert('Cadastro realizado com sucesso!');
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      alert('Erro ao realizar cadastro. Por favor, tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Cadastro </Title>
        
        <FormGroup>
          <Label htmlFor="name">Nome da Empresa</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome da empresa"
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
          />
          {errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="00.000.000/0000-00"
          />
          {errors.cnpj && <ErrorMessage>{errors.cnpj}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="empresa@email.com"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Digite o endereço completo"
          />
          {errors.endereco && <ErrorMessage>{errors.endereco}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="nameRes">Nome da empreendedora</Label>
          <Input
            type="text"
            id="nameRes"
            name="nameRes"
            value={formData.nameRes}
            onChange={handleChange}
            placeholder="Digite o nome da empreendedora"
          />
          {errors.nameRes && <ErrorMessage>{errors.nameRes}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </SubmitButton>

        <StyledLink to="/login">
          Já tem uma conta? Faça login
        </StyledLink>
      </FormContainer>
    </PageContainer>
  );
};