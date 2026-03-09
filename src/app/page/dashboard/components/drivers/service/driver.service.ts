import { Injectable } from '@angular/core';
import { BaseEntityService } from '../../../../../core/base/base-entity.service';
import { Driver } from '../model/drivers.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService extends BaseEntityService<Driver> {
  constructor() {
    super('http://localhost:3000/drivers');
  }
  override getIdentity(entity: Driver): string | number {
    return entity.id;
  }
}
