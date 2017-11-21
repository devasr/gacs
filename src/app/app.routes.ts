import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Route[] = [{
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    data : { isHome : true }
}
];
