import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceHolderDataService {

  apiUrl = environment.apiurl;
  constructor(private http: HttpClient) { }

  getData(){
    return  this.http.get(this.apiUrl + '/' + 'all');
  }

  update(event: any) {

    const headers = new HttpHeaders().set('Content-Type', 'application/text').set('method', 'PUT');
    const reg = event.reg;
    this.http.put(this.apiUrl + '/' + 'update' + '/' + reg, JSON.stringify(event), {headers}).subscribe(response => {
      console.log(response);
    });
  }
}
