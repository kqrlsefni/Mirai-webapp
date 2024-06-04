import { Routes } from "@angular/router";
import { EmpleadoListComponent } from "./empleado-list/empleado-list.component";
import { EmpleadoSalarioComponent } from "./empleado-salario/empleado-salario.component";

export const EMPLEADO_ROUTES: Routes = [
    {path:'', component:EmpleadoListComponent},
    {path:'salario', component:EmpleadoSalarioComponent}
];