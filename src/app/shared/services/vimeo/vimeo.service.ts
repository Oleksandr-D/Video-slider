import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {
  
  private accessToken = '74434322d3230f222a37c1831dd7f3d0';
  private apiUrl = 'https://api.vimeo.com/me/videos'; // Оновлено URL

  constructor(private http: HttpClient) {}

  /**
   * Метод для отримання списку відео з Vimeo
   */
  getVideos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.vimeo.video+json;version=3.4'
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
