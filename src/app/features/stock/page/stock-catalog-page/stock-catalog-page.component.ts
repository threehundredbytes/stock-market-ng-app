import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';
import { Stock } from '../../model/stock.model';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stock-catalog-page.component.html',
  styleUrls: ['./stock-catalog-page.component.scss']
})
export class StockCatalogPageComponent implements OnInit {

  public stocks: Stock[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getAllStocks().subscribe(stocks => this.stocks = stocks);
  }
}
