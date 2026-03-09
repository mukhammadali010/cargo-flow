import { inject, Injectable } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private message = inject(NzMessageService);
  createMessage(type: string, text: string): void {
    this.message.create(type, `${text}`);
  }
}
