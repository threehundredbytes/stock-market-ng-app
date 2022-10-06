import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { StockCatalogPageComponent } from './page/stock-catalog-page/stock-catalog-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StockPageComponent } from './page/stock-page/stock-page.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    StockCatalogPageComponent,
    StockPageComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class StockModule { }
