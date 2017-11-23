import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VideoComponent } from './video/video.component';


@NgModule({
  declarations: [AppComponent, DashboardComponent, VideoComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    VgCoreModule,
    VgControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
