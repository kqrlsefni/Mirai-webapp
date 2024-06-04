import { Routes } from "@angular/router";
export const HOME_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'empleado',
        loadChildren: () => import('../empleado/empleado.routes').then(m => m.EMPLEADO_ROUTES)
    },
    {
        path: 'salario',
        loadChildren: () => import('../salario/salario.routes').then(m => m.SALARIO_ROUTES)
    }
];