import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'squads',
                loadChildren: () => import('./squads/squads.module').then(m => m.SquadsModule)
            },
            {
                path: 'trainings',
                loadChildren: () => import('./trainings/trainings.module').then(m => m.TrainingsModule)
            },
            {
                path: 'training-performance',
                loadChildren: () => import('./training-performance/training-performance.module').then(m => m.TrainingPerformanceModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
            },
            {
                path: 'events',
                loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
