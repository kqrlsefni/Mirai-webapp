import { Area } from "./area.interface";
import { Contrato } from "./contrato.interface";
import { EmpleadoNombre } from "./empleado-nombre";
import { Jornada } from "./jornada.interface";
import { Salario } from "./salario.interface";
export interface Empleado{
    id: number;
    codigo: string;
    dni: string;
    nombreCompleto: string;
    empleado: {
        nombres: string;
        apePaterno: string;
        apeMaterno: string;
    };
    area: {
        id: number;
        nombre: string;
        salBasico: number;
    };
    jornada: {
        id: number;
        nombre: string;
        horas: number;
    };
    contrato: {
        id: number;
        nombre: string;
        fechaInicio: string;
        fechaFin: string;
    };
    salario: {
        id: number;
        salBasico: number;
        salNeto: number;
        salNetoFecha: string;
    };
    genero: string;
    fechaIngreso: string;
    fechaNacimiento: string;
    edad: number;
    antDias: number;
    antiguedad: string;
}