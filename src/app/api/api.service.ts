import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { PhoneBookEntry } from './phone-book-entry.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getEntries(): Observable<PhoneBookEntry[]> {
    return this.http.get<PhoneBookEntry[]>(`${environment.baseApi}/entries/`);
  }

  createEntry(entry: Omit<PhoneBookEntry, 'id'>): Observable<PhoneBookEntry> {
    return this.http.post<PhoneBookEntry>(`${environment.baseApi}/entries/`, entry);
  }

  updateEntry(entry: PhoneBookEntry): Observable<PhoneBookEntry> {
    return this.http.put<PhoneBookEntry>(`${environment.baseApi}/entries/${entry.id}`, entry);
  }

  deleteEntry(entry: PhoneBookEntry): Observable<void> {
    return this.http.delete<void>(`${environment.baseApi}/entries/${entry.id}`);
  }
}
