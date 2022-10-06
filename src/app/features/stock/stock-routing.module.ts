import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockCatalogPageComponent } from './page/stock-catalog-page/stock-catalog-page.component';
import { StockPageComponent } from './page/stock-page/stock-page.component';

const routes: Routes = [
  {
    path: '',
    component: StockCatalogPageComponent
  },
  {
    path: ':stockId',
    component: StockPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
