import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './comps/layout/layout.component';
import { HeaderComponent } from './comps/header/header.component';
import { FooterComponent } from './comps/footer/footer.component';
import { NotFoundComponent } from './comps/not-found/not-found.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
