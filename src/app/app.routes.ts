import { Route } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Route[] = [{
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
    data : { isHome : true }
}
];
