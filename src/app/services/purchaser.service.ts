import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaserDto } from '../models/purchaser.dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaserService {
  private apiUrl = 'http://localhost:8080/api/purchasers';

  constructor(private http: HttpClient) { }

  getAllPurchasers(): Observable<PurchaserDto[]> {
    return this.http.get<PurchaserDto[]>(this.apiUrl);
  }

  getPurchaserById(id: number): Observable<PurchaserDto> {
    return this.http.get<PurchaserDto>(`${this.apiUrl}/${id}`);
  }

  createPurchaser(purchaser: PurchaserDto): Observable<PurchaserDto> {
    return this.http.post<PurchaserDto>(this.apiUrl, purchaser);
  }

  updatePurchaser(id: number, purchaser: PurchaserDto): Observable<PurchaserDto> {
    return this.http.put<PurchaserDto>(`${this.apiUrl}/${id}`, purchaser);
  }

  deletePurchaser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
