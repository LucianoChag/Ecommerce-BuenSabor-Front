
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSucursalPage = location.pathname.startsWith("/sucursal");
  const isDetallePage = location.pathname.startsWith("/detalle");
  const isAllPage = location.pathname.startsWith("/Tod");

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
                  marginLeft: "auto", // Move the link to the right
                }}
              >
                Inicio
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
