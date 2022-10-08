import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StockPriceNotificationRequest } from '../../../../core/model/request/stock-price-notification.request.model';

@Component({
  selector: 'app-stock-price-notification-dialog',
  templateUrl: './stock-price-notification-dialog.component.html',
  styleUrls: ['./stock-price-notification-dialog.component.scss']
})
export class StockPriceNotificationDialogComponent {

  constructor(public dialogRef: MatDialogRef<StockPriceNotificationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StockPriceNotificationRequest) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
