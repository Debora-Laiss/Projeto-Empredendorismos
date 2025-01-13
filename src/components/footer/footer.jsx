import styled from 'styled-components';
import logo from "../../assets/logo.png";
import { Container, Typography, Box, Link } from '@mui/material';


const StyledFooter = styled.footer`
  background-color: #42a5f5;
  padding: 50px 20px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;


const FooterSection = styled.div`
  flex: 1;
  padding: 0 50px;

  h6 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 14px;
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    text-align: center;
    padding: 0 10px;
    align-items: center;

  }
`;

const SocialIconsWrapper = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  img {
    width: 150px;
    height: auto;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    img {
      width: 120px;
    }
  }
`;


export const Footer = () => {
  return (
    <StyledFooter>
      {/* Seção principal do footer */}
      <FooterSection>
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        <SocialIconsWrapper>
          {/* Adicione ícones de redes sociais aqui */}
        </SocialIconsWrapper>
      </FooterSection>

      {/* Seção de copyright e links */}
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          © 2024 BV Mulheres Negras Empreendedoras
        </Typography>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Instagram
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            LinkedIn
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Facebook
          </Link>
        </Box>
      </Container>
    </StyledFooter>
  );
};
