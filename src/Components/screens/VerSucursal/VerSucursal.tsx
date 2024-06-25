import React, { useEffect, useState, useMemo } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import SucursalService from '../../../service/SucursalService';
import Sucursal from '../../../types/Sucursal';
import CardSucursal from '../../ui/Cards/Sucursal/SucursalCard';
import Empresa from '../../../types/Empresa';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const VerSucursales: React.FC = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [empresa, setEmpresa] = useState<Empresa | null>(null);
    const url = import.meta.env.VITE_API_URL;

    const sucursalService = useMemo(() => new SucursalService(), []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const fetchedSucursales = await sucursalService.getAll(url + '/api/sucursales');
                setSucursales(fetchedSucursales);
                if (fetchedSucursales.length > 0) {
                    setEmpresa(fetchedSucursales[0].empresa);
                }
            } catch (error) {
                console.error('Error al obtener las sucursales:', error);
            }
        };

        fetchSucursales();
    }, [sucursalService, url]);

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                bgcolor="#f5f5dc"
                p={4}
            >
                <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{ 
                        fontFamily: 'Poppins', 
                        textAlign: 'center' 
                    }}
                >
                    {empresa ? `Sucursales de ${empresa.nombre}` : 'Cargando empresa...'}
                </Typography>
                {isMobile ? (
                    <Box
                        display="flex"
                        marginLeft={-14}
                        justifyContent="left"
                        alignItems="center"
                        width="100%"
                        maxWidth="600px" // Ajusta el tamaño máximo del carrusel según sea necesario
                    >
                        <Carousel showThumbs={false} infiniteLoop={true} showStatus={false}>
                            {sucursales.map(sucursal => (
                                <div key={sucursal.id}>
                                    <CardSucursal sucursal={sucursal} />
                                </div>
                            ))}
                        </Carousel>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {sucursales.map(sucursal => (
                            <Grid item key={sucursal.id} xs={12} sm={6} md={4}>
                                <CardSucursal sucursal={sucursal} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default VerSucursales;
