import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Account } from '../../model/account.model';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {

  public accounts?: Account[];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe(accounts => this.accounts = accounts);
  }

  public createAccount(): void {
    this.accountService.createAccount().subscribe(createdAccount => this.accounts?.push(createdAccount));
  }
}
