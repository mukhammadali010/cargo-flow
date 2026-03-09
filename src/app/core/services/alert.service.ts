import { Injectable } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})

export class AlertService {
    createMessage(type: string , text:string): void {
        this.message.create(type, `${text}`);
    }

    constructor(private message: NzMessageService) { }
}
