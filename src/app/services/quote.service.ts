import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = '/api/quotes'; // Proxy path

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addQuote(quote: { text: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, quote);
  }
}
