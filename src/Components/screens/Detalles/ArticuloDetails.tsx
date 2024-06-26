import React, { useEffect, useState, useMemo } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArticuloService from '../../../service/ArticuloService';
import Articulo from '../../../types/Articulo';

interface DetallesProps {
  
  userRole: string;
}

const Detalles: React.FC<DetallesProps> = React.memo(() => {
  const [articulo, setArticulo] = useState<Articulo>();
  const articuloService = useMemo(() => new ArticuloService(), []);
  const { id } = useParams<{ id: string }>();
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Importa y usa useNavigate

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        if (id) {
          const articuloId = parseInt(id, 10);
          const fetchedArticulo = await articuloService.get(`${url}/api/manufacturados`, articuloId);
          setArticulo(fetchedArticulo);
        }
      } catch (error) {
        console.error('Error al obtener el artículo:', error);
      }
    };

    fetchArticulo();
  }, [id, articuloService, url]);

  if (!articulo) {
    return <Typography variant="body1">Cargando detalles del artículo...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: '#f5f5dc', padding: '2rem', borderRadius: '8px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {articulo.denominacion}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={articulo.imagenes[0]?.url}
              alt={articulo.denominacion}
              sx={{ height: 'auto', maxHeight: 500 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#' }}>
            <CardContent>
              <Box mb={2}>
                <Typography variant="h6">Descripción</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>{articulo.descripcion || 'Sin descripción'}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">Detalles</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Precio:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{`$${articulo.precioVenta}`}</Typography>
                {articulo.tiempoEstimadoMinutos && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Tiempo estimado de preparación:</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>{`${articulo.tiempoEstimadoMinutos} minutos`}</Typography>
                  </>
                )}
                {articulo.categoria?.denominacion && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Categoría:</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>{articulo.categoria.denominacion}</Typography>
                  </>
                )}
                
              </Box>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button sx={{ mt: 2, backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' } }} onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
});

export default Detalles;
