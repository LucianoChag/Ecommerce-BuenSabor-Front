import Localidad from "./Localidad";
import Sucursal from "./Sucursal";

export default interface Domicilio {
    id: number;
    calle: string;
    eliminado: boolean;
    numero: number;
    cp: number;
    sucursal: Sucursal;
    localidad: Localidad;
    
  
  }