import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@Injectable()
export class GasServiceService {

public Server = 'http://localhost:8080/';
    


constructor(private http : HttpClient ) { }


public getAll<T>(): Observable<T> {
    return this.http.get<T>(this.Server + "gas/readgas")
}

public saveAllEB<T>(data: any[]): Observable<T>{
    console.log('logged');
    return this.http.post<T>(this.Server + "gas/readgas", data);
}
public creategas<T>(data: any[]) :Observable<T>
{
    console.log("into service method");
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    return this.http.post<T>(this.Server + "gas/updategas",JSON.stringify(data), {headers : header});
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
