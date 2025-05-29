import { Component, OnInit } from '@angular/core';
import { CarService, CarDto } from '../../services/car.service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    FormsModule
  ],
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  selectedCar: CarDto | null = null;
  isEditing = false;
  imageFile: File | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(data => this.cars = data);
  }

  onAdd(): void {
    this.selectedCar = { brand: '', model: '', year: new Date().getFullYear(), price: 0 };
    this.isEditing = false;
    this.imageFile = null;
  }

  onEdit(car: CarDto): void {
    this.selectedCar = { ...car };
    this.isEditing = true;
    this.imageFile = null;
  }

  onDelete(id: number): void {
    if (confirm('Удалить машину?')) {
      this.carService.deleteCar(id).subscribe(() => this.loadCars());
    }
  }

  onFileChange(event: any): void {
    this.imageFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.selectedCar) return;
    if (this.isEditing && this.selectedCar.id) {
      this.carService.updateCar(this.selectedCar.id, this.selectedCar)
        .subscribe(() => {
          if (this.imageFile) {
            this.carService.uploadCarImage(this.selectedCar!.id!, this.imageFile)
              .subscribe(() => {
                this.loadCars();
                this.selectedCar = null;
                this.imageFile = null;
              });
          } else {
            this.loadCars();
            this.selectedCar = null;
            this.imageFile = null;
          }
        });
    } else {
      this.carService.createCar(this.selectedCar, this.imageFile!)
        .subscribe(() => {
          this.loadCars();
          this.selectedCar = null;
          this.imageFile = null;
        });
    }
  }

  onCancel(): void {
    this.selectedCar = null;
    this.imageFile = null;
  }

  getImageUrl(relativePath: string): string {
    if (!relativePath) return '';
    return new URL(relativePath, 'http://localhost:8080').toString();
  }

}
