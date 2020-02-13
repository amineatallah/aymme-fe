import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class NotificationComponent implements OnInit {

  constructor(protected notificationService: NotificationService) { }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  ngOnInit(): void {
  }

}
