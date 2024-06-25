// VerArticulos.tsx
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import ArticuloService from '../../../service/ArticuloService';
import CategoriaService from '../../../service/CategoriaService';
import NoResults from '../../ui/Cards/NoResults/NoResults';
import TableComponent from '../../ui/TableComponent/TableComponent';
import Column from '../../../types/Column';
import { useTheme, useMediaQuery } from '@mui/material';

const VerArticulos = () => {
  const navigate = useNavigate();
  
  const [articulos, setArticulos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const articuloService = new ArticuloService();
  const categoriaService = new CategoriaService();
  const url = import.meta.env.VITE_API_URL;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const manufacturadosData = await articuloService.getAll(url + '/api/manufacturados');
        const insumosData = await articuloService.getAll(url + '/api/insumos');

        const filteredInsumos = insumosData.filter((insumo: any) => !insumo.esParaElaborar);
        const combinedArticulos = [...manufacturadosData, ...filteredInsumos];

        if (combinedArticulos.length === 0) {
          setError('No se encontraron artículos.');
        } else {
          setArticulos(combinedArticulos);
        }
      } catch (error) {
        setError('Error al obtener los artículos.');
        console.error('Error al obtener los artículos:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategorias = async () => {
      try {
        const categoriasData = await categoriaService.getAll(url + '/api/categorias');
        const filteredCategorias = categoriasData.filter((categoria: any) => categoria.denominacion !== 'Insumos');
        setCategorias(filteredCategorias);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchArticulos();
    fetchCategorias();
  }, [url]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const filteredArticulos = articulos.filter((articulo) =>
    articulo.denominacion.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || articulo.categoria.denominacion === selectedCategory)
  );

  const columns: Column[] = [
    { id: 'imagen', label: 'Imagen', renderCell: (row) => <img src={row.imagenes[0]?.url} alt="Articulo" style={{ width: '50px', height: '50px', borderRadius: '10px' }} /> },
    { id: 'denominacion', label: 'Denominación', renderCell: (row) => row.denominacion },
    { id: 'categoria', label: 'Categoría', renderCell: (row) => row.categoria.denominacion || '-' },
    { id: 'precioVenta', label: 'Precio', renderCell: (row) => `$${row.precioVenta}` },
    {
      id: 'actions',
      label: 'Acciones',
      renderCell: (row) => (
        <Tooltip title="Ver Detalle">
          <Button
            sx={{
              padding: '5px',
              backgroundColor: '#a6c732',
              color: 'white',
              '&:hover': { backgroundColor: '#b9d162' },
              minWidth: isMobile ? 'auto' : '60%',
              
            }}
            onClick={() => handleVerDetalle(row)}
          >
            <InfoIcon />
          </Button>
        </Tooltip>
      ),
    },
  ];

  const handleVerDetalle = (row: any) => {
    window.location.href = `/detalles/${row.id}`;
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5dc', padding: '2rem', borderRadius: '8px' }}>
      <Typography variant="h5" sx={{ my: 2, color: 'black' }}>
        Artículos Disponibles
      </Typography>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={8}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { backgroundColor: '#e0ebc2' } }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="select-category-label">Categoría</InputLabel>
            <Select
              labelId="select-category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Categoría"
              sx={{ backgroundColor: '#e0ebc2' }}
            >
              <MenuItem value="">Todas</MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.denominacion}>{categoria.denominacion}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : filteredArticulos.length === 0 ? (
        <NoResults />
      ) : (
        <TableComponent
          data={filteredArticulos}
          columns={columns}
          keyField="id"
          pagination
        />
      )}
      <Button sx={{ mt: 2, backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' }, width: '10%' }} size="small" onClick={() => navigate(-1)}>Volver</Button>
    </Container>
  );
};

export default VerArticulos;
