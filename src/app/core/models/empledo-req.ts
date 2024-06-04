export class EmpleadoReq{
    constructor(
        public id: number = 0,
        public codigo:string = '',
        public dni:string = '',
        public nombres:string = '',
        public apePaterno:string = '',
        public apeMaterno:string = '',
        public fechaIngreso:string ='',
        public fechaNacimiento:string='',
        public genero:string = '',
        public salario: {
            salBasico: string,
            salNeto?: string,
            salNetoFecha?: string,
        } = {
            salBasico: '',
            salNeto: '',
            salNetoFecha: '',
        },
        public contrato: {
            nombre: string,
            fechaInicio: string,
            fechaFin: string,
        } = {
            nombre: '',
            fechaInicio: '',
            fechaFin: '',
        },
        public areaId:number = 0,
        public jorLaboral:number = 0
    ){

    }
}