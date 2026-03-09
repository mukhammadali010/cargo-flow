export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  licenseNumber: string;
  licenseCategory: string;
  experienceYears: number;
  status: DriverStatus;
}
export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
}
