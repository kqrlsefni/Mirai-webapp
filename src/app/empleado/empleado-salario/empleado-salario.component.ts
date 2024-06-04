import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmpleadoService } from '../../core/services/empleado.service';
import { AreaService } from '../../core/services/area.service';
import { ContratoService } from '../../core/services/contrato.service';
import { JornadaService } from '../../core/services/jornada.service';
import { Empleado } from '../../core/models/empleado.interface';
import { Area } from '../../core/models/area.interface';
import { Contrato } from '../../core/models/contrato.interface';
import { Jornada } from '../../core/models/jornada.interface';
import { EmpleadoDetail } from '../../core/models/empleado-detail.interface';
import { Salario } from '../../core/models/salario.interface';
import { FormsModule } from '@angular/forms';
import { SalarioService } from '../../core/services/salario.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-empleado-salario',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule],
  templateUrl: './empleado-salario.component.html',
  styleUrl: './empleado-salario.component.css'
})
export class EmpleadoSalarioComponent implements AfterViewInit, OnDestroy{
  constructor(private elRef: ElementRef, private renderer: Renderer2,private empleadoService: EmpleadoService, private areaService: AreaService, private contratoService: ContratoService, private jornadaService: JornadaService, private salarioService: SalarioService) { }

  ngAfterViewInit(): void {
    const modalEdit = this.elRef.nativeElement.querySelector('#modalEditS');
    this.renderer.appendChild(document.body, modalEdit);
  }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
  areaSeleccionada(e: any){
    this.areaService.getArea(e.target.value).subscribe(a => {
      this.salario.salBasico = a.salBasico;
    });
}

editarSalario(id: number){
  this.empleadoService.getEmpleado(id).subscribe(d => {
    this.empleado = d;
    this.salario.id = this.empleado.salario.id
    this.salario.salBasico = this.empleado.salario.salBasico
  })
}

editar(){
  console.log(this.salario)
  this.salarioService.updateSalario(this.salario).subscribe((d) => {
  })
}

}
