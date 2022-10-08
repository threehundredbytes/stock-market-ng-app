import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { StockCatalogPageComponent } from './page/stock-catalog-page/stock-catalog-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StockPageComponent } from './page/stock-page/stock-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StockPriceNotificationDialogComponent } from './component/stock-price-notification-dialog/stock-price-notification-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StockCatalogPageComponent,
    StockPageComponent,
    StockPriceNotificationDialogComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
  ],
})
export class StockModule { }
