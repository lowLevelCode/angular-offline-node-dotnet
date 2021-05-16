import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Observable, throwError } from "rxjs";
import { CacheSchema, TableNameEnum } from "../data/db.config";
import { IStorable } from "../data/IStorable";
import { ERROR_INTERCEPTOR_OFFLINE } from "./error-offline.interceptor";


/**
 * Esta clase almacena en cache la informacion que deberia ir al servidor.
 */
export class OfflineInteceptor implements HttpInterceptor {

    constructor(private dbService: NgxIndexedDBService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const url:string = req.url;
        const method:string = req.method;
        const storableData:IStorable<unknown> = {
            tableName: req.body?.tableName,
            data:req.body?.data,
        }

        if (!window.navigator.onLine) { // if we are offline    
            // TODO: validar que no exista el mismo tipo de cache.
            // asi evitariamos tener 2 iteraciones de x consulta.
            if(storableData?.tableName) {
                this.dbService.add<CacheSchema>(
                    TableNameEnum.CACHE,
                    {url,method,tableName:storableData?.tableName})
                    .subscribe();
                this.dbService.add(storableData?.tableName,storableData?.data).subscribe();
            }

            return throwError(new HttpErrorResponse(ERROR_INTERCEPTOR_OFFLINE));

        } else {
            const modifiedReq = req.clone({ 
                body:storableData?.data
            });
            return next.handle(modifiedReq);
        }
   }
  }