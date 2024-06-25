import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSucursalPage = location.pathname.startsWith("/sucursal");
  const isDetallePage = location.pathname.startsWith("/detalle");
  const isAllPage = location.pathname.startsWith("/Tod");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#a6c732" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#FFFFBF",
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img
                src="/img/buenSabor.png"
                alt="Logo de Buen Sabor"
                style={{ width: "130px", height: "35px", marginRight: "2px" }}
              />
              <LunchDiningOutlinedIcon sx={{ color: "#FFFFBF", mr: 1 }} />
            </Link>
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {isHomePage && (
                  <>
                    <MenuItem onClick={handleMenuClose}>
                      <Link to="/TodasLasPromociones" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Promociones
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <Link to="/TodosLosArticulos" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Productos
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Inicio
                      </Link>
                    </MenuItem>
                  </>
                )}
                {(isDetallePage || isAllPage || isSucursalPage) && (
                  <MenuItem onClick={handleMenuClose}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Inicio
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: isHomePage ? "space-between" : "flex-end",
                alignItems: "center",
                flexGrow: 1,
                maxWidth: isHomePage ? "300px" : "none",
                marginLeft: isHomePage ? "auto" : "0",
                marginRight: "0",
              }}
            >
              {isHomePage && (
                <>
                  <Link
                    to="/TodasLasPromociones"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      margin: "0 10px",
                    }}
                  >
                    Promociones
                  </Link>
                  <Link
                    to="/TodosLosArticulos"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      margin: "0 10px",
                    }}
                  >
                    Productos
                  </Link>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      margin: "0 10px",
                    }}
                  >
                    Inicio
                  </Link>
                </>
              )}
              {(isDetallePage || isAllPage || isSucursalPage) && (
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginLeft: "auto",
                  }}
                >
                  Inicio
                </Link>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
