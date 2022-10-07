import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Account } from '../../model/account.model';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../../component/payment-dialog/payment-dialog.component';
import { PaymentService } from '../../service/payment.service';
import { Payment } from '../../model/payment.model';
import { PaymentStatus } from '../../model/payment-status.model';
import { NotificationService } from '../../../../core/notification/notification.service';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {

  public accounts: Account[] = [];

  constructor(private accountService: AccountService,
              private paymentService: PaymentService,
              private notificationService: NotificationService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe(accounts => {
      this.accounts = accounts.sort((a, b) => a.id - b.id);
    });
  }

  public createAccount(): void {
    this.accountService.createAccount().subscribe(createdAccount => this.accounts?.push(createdAccount));
  }

  openPaymentDialog(accountId: number): void {
    let payment: Payment = {
      accountId: accountId,
      amount: 0
    }

    const dialogRef = this.matDialog.open(PaymentDialogComponent, {
      width: '250px',
      data: payment
    });

    dialogRef.afterClosed().subscribe(paymentAmount => {
      payment.amount = paymentAmount;

      if (payment.amount != undefined) {
        this.paymentService.createPayment(payment).subscribe(payment => {
          if (payment.paymentStatus === PaymentStatus.SUCCESS) {
            this.accounts[this.accounts.findIndex(account => account.id === accountId)].balance += payment.amount;
            this.notificationService.success("Payment successfully created");
          } else {
            this.notificationService.warn("Payment failed, please try again!");
          }
        });
      }
    });
  }
}
