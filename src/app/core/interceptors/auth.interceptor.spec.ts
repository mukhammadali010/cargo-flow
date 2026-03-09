import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../../features/auth/auth.service';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  const mockAuthService = {
    token: () => 'test-token',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add authorization header', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');

    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not add authorization header if token is null', () => {
    mockAuthService.token = () => '';

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');

    expect(req.request.headers.has('Authorization')).toBeFalse();
  });
});
