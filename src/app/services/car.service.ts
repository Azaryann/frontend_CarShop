import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CarDto {
  id?: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl?: string;
  purchaserId?: number;
}

@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<CarDto> {
    return this.http.get<CarDto>(`${this.apiUrl}/${id}`);
  }

  createCar(car: CarDto, image?: File): Observable<CarDto> {
    const formData = new FormData();
    formData.append('car', new Blob([JSON.stringify(car)], { type: 'application/json' }));
    if (image) formData.append('image', image);
    return this.http.post<CarDto>(this.apiUrl, formData);
  }

  updateCar(id: number, car: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('car', new Blob([JSON.stringify(car)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadCarImage(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/upload-image`, formData);
  }
}
