import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCLient: HttpClient) { }

  PATH_OF_API = "http://localhost:8080";


  requestHeader = new HttpHeaders({
    "No-Auth": 'True'
  })

  public login(loginData: string) {
    return this.httpCLient.post(`${this.PATH_OF_API}/authenticate`, loginData, { headers: this.requestHeader })

  }
}
