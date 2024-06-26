import React, { useEffect, useState, useMemo } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import PromotionService from '../../../service/PromocionService';

interface DetallesProps {
  userRole: string;
}

const PromotionDetails: React.FC<DetallesProps> = React.memo(() => {
  const [promotion, setPromotion] = useState<any>(null);
  const promotionService = useMemo(() => new PromotionService(), []);
  const { id } = useParams<{ id: string }>();
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        if (id) {
          const promotionId = parseInt(id, 10);
          const fetchedPromotion = await promotionService.get(`${url}/api/promociones`, promotionId);
          setPromotion(fetchedPromotion);
        }
      } catch (error) {
        console.error('Error al obtener la promoción:', error);
      }
    };

    fetchPromotion();
  }, [id, promotionService, url]);

  if (!promotion) {
    return <Typography variant="body1">Cargando detalles de la promoción...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: '#f5f5dc', padding: '2rem', borderRadius: '8px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {promotion.denominacion}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={promotion.imagenes[0].url}
              alt={promotion.denominacion}
              sx={{ height: 'auto', maxHeight: 500 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <CardContent>
              <Box mb={2}>
                <Typography variant="h6">Descripción</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>{promotion.descripcionDescuento}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">Detalles</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Desde:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{promotion.fechaDesde}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Hasta:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{promotion.fechaHasta}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Precio Promocional:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>${promotion.precioPromocional}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Sucursales:</Typography>
                {promotion.sucursales.map((sucursal: any) => (
                  <Typography key={sucursal.id} variant="body1" sx={{ mb: 1 }}>{sucursal.nombre} - {sucursal.domicilio.calle} {sucursal.domicilio.numero}, {sucursal.domicilio.localidad.nombre}</Typography>
                ))}
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Artículos:</Typography>
                <Grid container spacing={2}>
                  {promotion.promocionDetalles.map((detalle: any) => (
                    <Grid item key={detalle.id} xs={12}>
                      <Typography variant="body1" sx={{ mb: 1 }}>{detalle.cantidad}x {detalle.articulo.denominacion}</Typography>
                    </Grid>
                  ))}
                </Grid>
                
              </Box>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
      <Button sx={{ mt: 2, backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' }, width: '10%' }} size="small" onClick={() => navigate(-1)}>Volver</Button>
    </Container>
  );
});

export default PromotionDetails;
