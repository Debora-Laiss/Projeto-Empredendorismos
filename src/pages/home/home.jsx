import styled from "styled-components";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import img from "../../assets/img-home.webp";
import videoAbertura from "../../assets/videos/videoAbertura.mp4";

import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box
 
} from '@mui/material';


const HeroSection = styled(Box)` 
  color: black; 
  fontWeight: bold;
  text-align: center;
  padding: 64px 0; 
  margin-bottom: 32px; 
`;

const ImgSection = styled(Box)`   
  background-image: url(${img});  
  background-size: cover; 
  background-position: center; 
  height: 500px;
`;
const FeatureCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#F2F2F2'
  }
}));



export const Home = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <>
      <Header/>

     <ImgSection>
     </ImgSection>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            Empoderamento Digital para Mulheres Empreendedoras
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Transformando negócios, conectando talentos
          </Typography>
          <Button 
            variant="contained" 
            color= "primary"
            size="large"
            onClick={() => navigateTo('/cadastro')}
            sx={{ 
              mt: 3, 
              backgroundColor: '#0099CC',               
              borderRadius: '10px',
              padding: '10px',
              transition: 'all 0.4s ease-in-out',


              '&:hover': {
                backgroundColor: '#00CCFF' 
              }
            }}
          >
            Faça Parte
          </Button>
        </Container>
      </HeroSection>


      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} padding={'80px'} height={'300px'}>
          {[
            {
              title: "Crédito Consciente",
              description: "Acesso facilitado a recursos financeiros"
            },
            {
              title: "Capacitação",
              description: "Workshops e cursos de gestão"
            },
            {
              title: "Digitalização",
              description: "Soluções tecnológicas personalizadas"
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}>
          <Typography variant="h4" component="h2" textAlign="center">
            Conheça Nossa Proposta
          </Typography>
          <Box sx={{
            width: '100%',
            maxWidth: '800px', 
          }}>
            <video
              width="100%"
              controls
              style={{ borderRadius: '8px' }}
            >
              <source src= {videoAbertura} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </Box>
        </Box>
      </Container>

    <Footer/>
    </>
  
  );
};

