import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../core/notification/notification.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.info("Welcome to stock-market-ng-app!")
  }

}
