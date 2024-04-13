import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {
  

  constructor(private http: HttpClient) { }

  getRandomVideo(): Observable<any> {
    const accessToken = '74434322d3230f222a37c1831dd7f3d0';
    const endpoint = `https://api.vimeo.com/380b8195ff8a0f6cac4c4520a40c8147ac6feec3/videos?access_token=${accessToken}`;
    return this.http.get(endpoint);
  }
}
