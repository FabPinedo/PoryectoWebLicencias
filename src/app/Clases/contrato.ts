import { Conexion } from "./conexion";
import { Empresa } from "./empresa";
import { Sistema } from "./sistema";

export class Contrato {
  id:number;
  codempresa:number;
  empresa:Empresa;
  codsistema:number;
  sistema:Sistema;
  codconexion:number;
  conexion:Conexion;
  fechainicontrato:Date;
  fechafincontrato:Date;
  estado:boolean;
  token:string;
}
