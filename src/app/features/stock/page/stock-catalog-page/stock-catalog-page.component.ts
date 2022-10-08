import { Component, OnDestroy, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';
import { Stock } from '../../model/stock.model';
import { Subscription } from 'rxjs';
import { StockMarketStompService } from '../../../../core/stomp/stock-market-stomp.service';
import { StockPrice } from '../../model/stock-price.model';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stock-catalog-page.component.html',
  styleUrls: ['./stock-catalog-page.component.scss']
})
export class StockCatalogPageComponent implements OnInit, OnDestroy {

  private stockSubscriptions: Subscription[] = [];
  public stocks: Stock[] = [];

  constructor(private stockService: StockService, private stockMarketStompService: StockMarketStompService) { }

  ngOnInit(): void {
    this.stockService.getAllStocks().subscribe(stocks => {
      this.stocks = stocks.sort((a, b) => a.id - b.id);

      this.stocks.forEach((stock) => {
        const subscription = this.stockMarketStompService.watchStocksPrices(stock.id).subscribe(stocksPriceChange => {
          const stockPrice: StockPrice = JSON.parse(stocksPriceChange.body);

          stock.price = stockPrice.newPrice;
        });

        this.stockSubscriptions.push(subscription);
      })
    });
  }

  ngOnDestroy(): void {
    this.stockSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
