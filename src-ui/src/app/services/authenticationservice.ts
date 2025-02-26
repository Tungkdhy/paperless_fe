import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InfoLogin } from '../data/info-login';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    baseUrl = 'http://222.252.98.195:9002/authenticator/login/'
    // baseUrl = 'http://222.252.98.195:9002/login/'
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,

    ) { }

    getCoookie(): any {
        this.http.get('http://222.252.98.195:9002/authenticator/login/').subscribe(
            (res) => {
                console.log("res", res);
            },
            (error) => {
                console.log('eee', error);
            }
        )
    }

    login(data: InfoLogin): Observable<any> {
        let body = {
            username: data?.username,
            password: data?.password,
            // csrfmiddlewaretoken:this.cookieService.get('csrftoken')
        }
        // const CSRFToken = this.cookieService.get('csrftoken');
        // console.log('CSRF Token:', CSRFToken); // Kiểm tra giá trị của csrfToken
        return this.http.post(this.baseUrl, body)
    }
}
