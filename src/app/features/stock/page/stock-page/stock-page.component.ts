import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StockService } from '../../service/stock.service';
import { Stock } from '../../model/stock.model';
import { StockMarketStompService } from '../../../../core/stomp/stock-market-stomp.service';
import { StockPrice } from '../../model/stock-price.model';
import { Subscription } from 'rxjs';
import { Payment } from '../../../accounts/model/payment.model';
import { PaymentDialogComponent } from '../../../accounts/component/payment-dialog/payment-dialog.component';
import { PaymentStatus } from '../../../accounts/model/payment-status.model';
import { StockPriceNotificationRequest } from '../../../../core/model/request/stock-price-notification.request.model';
import { MatDialog } from '@angular/material/dialog';
import {
  StockPriceNotificationDialogComponent
} from '../../component/stock-price-notification-dialog/stock-price-notification-dialog.component';
import { NotificationService } from '../../../../core/notification/notification.service';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss']
})
export class StockPageComponent implements OnInit, OnDestroy {
  private stockPriceSubscription?: Subscription;
  public stock?: Stock;
  public isTrendingUp = false;
  public isTrendingDown = false;

  constructor(private stockService: StockService,
              private notificationService: NotificationService,
              private stockMarketStompService: StockMarketStompService,
              private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
      let stockId = this.activatedRoute.snapshot.params['stockId'];

      if (stockId != null) {
        this.stockService.getStockById(stockId).subscribe(stock => {
          this.stock = stock[0];

          this.stockPriceSubscription = this.stockMarketStompService.watchStocksPrices(this.stock.id)
            .subscribe(stockPriceChange => {
              let stockPrice: StockPrice = JSON.parse(stockPriceChange.body);

              if (this.stock!.price < stockPrice.newPrice) {
                this.isTrendingUp = true;
                this.isTrendingDown = false;
              }

              if (this.stock!.price > stockPrice.newPrice) {
                this.isTrendingUp = false;
                this.isTrendingDown = true;
              }

              this.stock!.price = stockPrice.newPrice;
            });
        });
      }
  }

  ngOnDestroy(): void {
    this.stockPriceSubscription?.unsubscribe();
  }

  openStockPriceNotificationDialog() {
    if (this.stock != undefined) {
      let stockPriceNotification: StockPriceNotificationRequest = {
        stockId: this.stock?.id,
        atPrice: this.stock?.price
      }

      const dialogRef = this.matDialog.open(StockPriceNotificationDialogComponent, {
        width: '250px',
        data: stockPriceNotification
      });

      dialogRef.afterClosed().subscribe(atPrice => {
        stockPriceNotification.atPrice = atPrice;

        if (stockPriceNotification.atPrice != undefined) {
          this.notificationService.createStockPriceNotification(stockPriceNotification).subscribe(() => {
              this.notificationService.success("Notification successfully created");
          });
        }
      });
    }
  }
}
