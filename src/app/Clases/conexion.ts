import { Empresa } from "./empresa";

export class Conexion {
  id:number;
  bdservinstancia:string;
  bdnombre:string;
  bdtipo:string;
  bdusuario:string;
  bdcontra:string;
  tomcatpuerto:string;
  tomcatusuario:string;
  tomcatcontra:string;
  weburl:string;
  codempresa:number;
  empresa:Empresa;
}
