import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStorable } from '../data/IStorable';
import { User } from '../models/users/user';

@Injectable()
export class UsersService {
    url:string = environment.endpoint;
    constructor(private readonly _http: HttpClient) { }

    create(user:IStorable<User>): Observable<unknown> {
      return this._http.post(`${this.url}/user`,user);
    }
}