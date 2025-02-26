import { TestBed } from '@angular/core/testing'
import { HTTPInterceptor } from './http.interceptor';


describe('HTTPInterceptor', () => {
  let service: HTTPInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});