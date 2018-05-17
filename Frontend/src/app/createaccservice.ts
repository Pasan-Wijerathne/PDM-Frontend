import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

@Injectable()
export class Createaccservice 
{

    public Server = 'http://localhost:8080/';
        
    constructor(private http : HttpClient ) { }

    public createacc<T>(data: any[]) :Observable<T>
    {
        console.log("into method");
        return this.http.post<T>(this.Server + "/createuser",data);
    }


}
 

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(req.headers));
        return next.handle(req);
    }
}