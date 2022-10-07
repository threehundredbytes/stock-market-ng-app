import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../../model/stock.model';
import { Account } from '../../model/account.model';
import { StockService } from '../../service/stock.service';
import { StockPrice } from '../../../stock/model/stock-price.model';
import { RxStompService } from '../../../../core/stomp/rx-stomp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  private stockSubscriptions: Subscription[] = [];
  public account?: Account;
  public stocks: Stock[] = [];

  constructor(private accountService: AccountService,
              private stockService: StockService,
              private rxStompService: RxStompService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const accountId = this.activatedRoute.snapshot.params['accountId'];

    this.accountService.getAccountById(accountId).subscribe(account => this.account = account);

    if (accountId != null) {
      this.accountService.getAllStocksOnAccount(accountId).subscribe(stocksOnAccount => {
        this.stocks = stocksOnAccount;

        this.stockService.getStocksByIds(this.stocks.map(stock => stock.id)).subscribe(stocks => {
          this.stocks = this.stocks.map(t1 => ({...t1, ...stocks.find(t2 => t2.id === t1.id)}))
            .sort((a, b) => a.purchasedAt.getTime() - b.purchasedAt.getTime());

          this.stocks.forEach((stock) => {
            const subscription = this.rxStompService.watch(`/topic/stocks/${stock.id}/prices`).subscribe(stocksPriceChange => {
              const stockPrice: StockPrice = JSON.parse(stocksPriceChange.body);

              stock.price = stockPrice.newPrice;
            });

            this.stockSubscriptions.push(subscription);
          })
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.stockSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getStockCurrentQuantity(stock: Stock): number {
    return stock.quantity - stock.reservedQuantity;
  }

  getStockFormattedPrice(stock: Stock, quantity: number): string {
    return (stock.price * quantity)
      .toFixed(2)
      .replace(/\.00$/, "");
  }
}
