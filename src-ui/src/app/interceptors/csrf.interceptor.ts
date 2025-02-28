import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import { Meta } from '@angular/platform-browser'

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private meta: Meta
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let prefix = ''
    if (this.meta.getTag('name=cookie_prefix')) {
      prefix = this.meta.getTag('name=cookie_prefix').content
    }
    let csrfToken = this.cookieService.get(`csrftoken`)
    let token = localStorage.getItem("token")
   
      request = request.clone({
        setHeaders: {
          'authorization': `Token be2e244ddd38653d8901c4e827f8cc539b33d0a2`,
          // "Content-Type":"application/json"
        },
      })


    return next.handle(request)
   
   
  }
}
