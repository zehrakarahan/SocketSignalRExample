import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/UserModel";

@Injectable({
  providedIn: 'root'
})
export class Authentication {

  private apiUrl = 'http://localhost:5093/api/Home'; // .NET Core API URL'niz

  constructor(private http: HttpClient) { }

  public login(credentials: UserModel):Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Login', credentials);
  }

}
