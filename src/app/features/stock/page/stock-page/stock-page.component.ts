import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StockService } from '../../service/stock.service';
import { Stock } from '../../model/stock.model';
import { RxStompService } from '../../../../core/stomp/rx-stomp.service';
import { StockPrice } from '../../model/stock-price.model';
import { Subscription } from 'rxjs';

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
              private rxStompService: RxStompService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      let stockId = this.activatedRoute.snapshot.params['stockId'];

      if (stockId != null) {
        this.stockService.getStockById(stockId).subscribe(stock => {
          this.stock = stock[0];

          this.stockPriceSubscription = this.rxStompService.watch(`/topic/stocks/${this.stock?.id}/prices`)
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
}
