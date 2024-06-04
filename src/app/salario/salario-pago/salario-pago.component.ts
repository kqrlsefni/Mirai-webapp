import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContratoService } from '../../core/services/contrato.service';
import { EmpleadoService } from '../../core/services/empleado.service';
import { JornadaService } from '../../core/services/jornada.service';
import { AreaService } from '../../core/services/area.service';
import { Empleado } from '../../core/models/empleado.interface';
import { Area } from '../../core/models/area.interface';
import { Jornada } from '../../core/models/jornada.interface';
import { Contrato } from '../../core/models/contrato.interface';
import { EmpleadoDetail } from '../../core/models/empleado-detail.interface';
import { Salario } from '../../core/models/salario.interface';
import { FormsModule } from '@angular/forms';
import { SalarioNeto } from '../../core/models/salario-neto.interface';
import { SalarioNetoRe } from '../../core/models/salario-neto-req';
import { SalarioService } from '../../core/services/salario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-salario-pago',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule],
  templateUrl: './salario-pago.component.html',
  styleUrl: './salario-pago.component.css'
})
export class SalarioPagoComponent implements AfterViewInit, OnDestroy{
  constructor(private elRef: ElementRef, private renderer: Renderer2,private empleadoService: EmpleadoService, private areaService: AreaService, private contratoService: ContratoService, private jornadaService: JornadaService, private salarioService: SalarioService) { }
  empleados: Empleado[] = []
  areas: Area[] = []
  contratos: Contrato[] = []
  jornadas: Jornada[] = []
  salarioBasico = ''
  jornadaHoras = ''
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
  salario: Salario = {
    id: 0,
    salBasico: 0,
    salNeto: 0,
    salNetoFecha: "",
  }
  salarioNeto: SalarioNeto = {
    gratificacionJD: 0,
    bonoGeneral: 0,
    bonoAntiguedad: 0,
    bonoEdad: 0,
    impuesto: 0,
    salud: 0,
    cts: 0,
    neto: 0,
  }
  salarioNetoReq: SalarioNetoRe = {
    salId: 0,
    fechaInicio: "",
    fechaFin: "",
    fechaNacimiento: "",
  }
  subscription: Subscription = new Subscription
  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    })
    this.subscription = this.salarioService.refresh$.subscribe(() => {
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

  ngAfterViewInit(): void {
    const modalCalcular = this.elRef.nativeElement.querySelector('#modalCalcular');
    this.renderer.appendChild(document.body, modalCalcular);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

  calcularPago(id: number){
    this.empleadoService.getEmpleado(id).subscribe(d => {
      this.empleado = d;
      this.salarioNetoReq.salId = this.empleado.salario.id
      this.salarioNetoReq.fechaInicio = this.empleado.contrato.fechaInicio
      this.salarioNetoReq.fechaFin = this.empleado.contrato.fechaFin
      this.salarioNetoReq.fechaNacimiento = this.empleado.fechaNacimiento
      
    })
    this.calcular(id)
    
  }

  calcular(id : number){
    this.salarioService.getSalarioNeto(id).subscribe((d) => {
      this.salarioNeto = d;
      console.log(this.salarioNeto)
    })
  }

  guardarPago(){
    this.salario.id = this.empleado.salario.id
    this.salario.salBasico = this.empleado.salario.salBasico
    this.salario.salNeto = this.salarioNeto.neto
    console.log(this.salario)
    this.salarioService.updateSalario(this.salario).subscribe(() => {

    })
  }
  exportarPagoExcel(){
    this.salarioService.getPagoExcel().subscribe((d) => {
      let file = new Blob([d], {type: 'application/vnd.ms-excel'});
      var fileUrl = URL.createObjectURL(file);
      window.open(fileUrl);
    })
  }
}


