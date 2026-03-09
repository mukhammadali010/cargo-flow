import { Injectable } from '@angular/core';
import { BaseEntityService } from '../../../../../core/base/base-entity.service';
import { User } from '../../../../../features/auth/login/login.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseEntityService<User> {
  constructor() {
    super('http://localhost:3000/users');
  }

  override getIdentity(entity: User): string | number {
    return entity.id;
  }
}
