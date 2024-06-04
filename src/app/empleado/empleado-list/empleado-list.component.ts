import { AfterViewInit, Component, ElementRef, NgModule, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmpleadoService } from '../../core/services/empleado.service';
import { Empleado } from '../../core/models/empleado.interface';
import { EmpleadoDetail } from '../../core/models/empleado-detail.interface';
import { Area } from '../../core/models/area.interface';
import { AreaService } from '../../core/services/area.service';
import { Contrato } from '../../core/models/contrato.interface';
import { Jornada } from '../../core/models/jornada.interface';
import { ContratoService } from '../../core/services/contrato.service';
import { JornadaService } from '../../core/services/jornada.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { EmpleadoReq } from '../../core/models/empledo-req';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.css'
})
export class EmpleadoListComponent implements AfterViewInit, OnInit, OnDestroy{
standalone: boolean|undefined;
  constructor(private elRef: ElementRef, private renderer: Renderer2,private empleadoService: EmpleadoService, private areaService: AreaService, private contratoService: ContratoService, private jornadaService: JornadaService) { 

  }
  empleados: Empleado[] = []
  areas: Area[] = []
  contratos: Contrato[] = []
  jornadas: Jornada[] = []
  salarioBasico = ''
  jornadaHoras = ''
  fechaIngreso = ''
  codigo = ''
  idEliminar = 0
  resetSelect = -1
  minFechaFin = "05/08/2024"
  empleadoReq: EmpleadoReq = new EmpleadoReq();
  private counter: number = 1
  empleado: Empleado = {
    id: 0,
    codigo: "",
    dni: "",
    nombreCompleto: "",
    empleado: {
        nombres: "",
        apePaterno: "",
        apeMaterno: "",
    },
    area: {
        id: 0,
        nombre: "",
        salBasico: 0,
    },
    jornada: {
        id: 0,
        nombre: "",
        horas: 0,
    },
    contrato: {
        id: 0,
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
    },
    salario: {
        id: 0,
        salBasico: 0,
        salNeto: 0,
        salNetoFecha: "",
    },
    genero: "",
    fechaIngreso: "",
    fechaNacimiento: "",
    edad: 0,
    antDias: 0,
    antiguedad: "",
  };
  subscription: Subscription = new Subscription
  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(e => {
      this.empleados = e;
    })
    this.subscription = this.empleadoService.refresh$.subscribe(() => {
      this.empleadoService.getEmpleados().subscribe(e => {
        this.empleados = e;
      })
    })
    this.areaService.getAreas().subscribe(a => {
      this.areas = a;
    })
    this.contratoService.getContratos().subscribe(c => {
      this.contratos = c;
    })
    this.jornadaService.getJornadas().subscribe(j => {
      this.jornadas = j;
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

empleadoDetail(id: number){
  console.log(id)
  this.empleadoService.getEmpleado(id).subscribe(d => {
    this.empleado = d;
  })
}

  ngAfterViewInit(): void {
    const modalInfo = this.elRef.nativeElement.querySelector('#modalInfo');
    this.renderer.appendChild(document.body, modalInfo);
    const modalEdit = this.elRef.nativeElement.querySelector('#modalEdit');
    this.renderer.appendChild(document.body, modalEdit);
    const modalNew = this.elRef.nativeElement.querySelector('#modalNew');
    this.renderer.appendChild(document.body, modalNew);
    const modalDelete = this.elRef.nativeElement.querySelector('#modalDelete');
    this.renderer.appendChild(document.body, modalDelete);
  }

  areaSeleccionada(e: any){
      console.log(e.target.value);
      this.areaService.getArea(e.target.value).subscribe(a => {
        this.empleadoReq.salario.salBasico = a.salBasico.toString();
      });
  }
  jornadaSeleccionada(e: any){
      console.log(e.target.value);
      this.jornadaService.getJornada(e.target.value).subscribe(j => {
        this.jornadaHoras = j.horas.toString();
      })
  }

  newEmpleado(){
    this.empleadoReq = new EmpleadoReq
    this.empleadoReq.fechaIngreso = new Date().toISOString().slice(0, 10);
    this.empleadoReq.contrato.fechaInicio = new Date().toISOString().slice(0, 10);
    this.empleadoReq.contrato.fechaFin = new Date(new Date().getFullYear() + 1,new Date().getMonth(), new Date().getDate()).toISOString().slice(0, 10);
    this.minFechaFin = this.empleadoReq.contrato.fechaFin;
    this.empleadoReq.codigo = this.generateCode();
    this.jornadaHoras = ''
    this.empleadoReq.areaId = this.resetSelect
    this.empleadoReq.jorLaboral = this.resetSelect
    this.empleadoReq.contrato.nombre = this.resetSelect.toString()

  }

  changeFI(e: Event){
console.log(e)
    this.empleadoReq.contrato.fechaInicio = this.empleadoReq.fechaIngreso;
  }

  generateCode(): string {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomCharacters = Array.from({ length: 2 }, () => alphanumeric[Math.floor(Math.random() * alphanumeric.length)]).join('');
    const uuid = uuidv4().split('-')[0]; // Obtener el primer bloque del UUID
    const uniqueCode = randomCharacters + uuid;

    return uniqueCode;
  }

  onSubmit(){
    this.empleadoService.createEmpleado(this.empleadoReq).subscribe((data) => {
    })
  }

  empleadoEdit(id : number){
    this.empleadoService.getEmpleado(id).subscribe(d => {
      this.empleado = d;
      this.empleadoReq.id = this.empleado.id
      this.empleadoReq.codigo = this.empleado.codigo
    this.empleadoReq.dni = this.empleado.dni
    this.empleadoReq.fechaNacimiento = this.empleado.fechaNacimiento
    this.empleadoReq.fechaIngreso = this.empleado.fechaIngreso
    this.empleadoReq.contrato.fechaInicio = this.empleado.contrato.fechaInicio
    this.empleadoReq.contrato.fechaFin = this.empleado.contrato.fechaFin
    this.empleadoReq.salario.salBasico = this.empleado.salario.salBasico.toString()
    this.empleadoReq.genero = this.empleado.genero
    this.empleadoReq.nombres = this.empleado.empleado.nombres
    this.empleadoReq.apePaterno = this.empleado.empleado.apePaterno
    this.empleadoReq.apeMaterno = this.empleado.empleado.apeMaterno
    this.empleadoReq.areaId = this.empleado.area.id
    this.empleadoReq.jorLaboral = this.empleado.jornada.id
    this.jornadaHoras = this.empleado.jornada.horas.toString()
    this.empleadoReq.contrato.nombre = this.empleado.contrato.nombre
    })

  }

  editar(){
    this.empleadoService.updateEmpleado(this.empleadoReq).subscribe((d) =>{
      
    })
  }

  empleadoEliminar(id: number){
    this.idEliminar = id
  }

  eliminar(){
    this.empleadoService.deleteEmpleado(this.idEliminar).subscribe((d) => {

    })
  }

  numberInput(event: KeyboardEvent){
    const keyCode = event.keyCode || event.which;

    if ((keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        keyCode === 8 || keyCode === 9 || keyCode === 46 ||
        (keyCode >= 37 && keyCode <= 40)) {
      return;
    }

    event.preventDefault();
  }

  letterInput(event: KeyboardEvent){
    const keyCode = event.keyCode || event.which;

    if ((keyCode >= 65 && keyCode <= 90) ||
        (keyCode >= 97 && keyCode <= 122) ||
        keyCode === 32 || keyCode === 8 || keyCode === 9 || keyCode === 46 ||
        (keyCode >= 37 && keyCode <= 40)) {
      return;
    }
    event.preventDefault();
    
  }

  ingresoChange(event: any){
    console.log(event.target)
    //this.empleadoReq.contrato.fechaInicio = event.target.value;
  }

  inicioChange(){
    this.empleadoReq.fechaIngreso = this.empleadoReq.contrato.fechaInicio
  }


}
