import { Component, OnInit } from '@angular/core';
import { PurchaserService } from '../../services/purchaser.service';
import { AuthService } from '../../services/auth.service';
import { PurchaserDto } from '../../models/purchaser.dto';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  purchasers: PurchaserDto[] = [];
  selectedPurchaser: PurchaserDto | null = null;
  isEditing = false;

  constructor(
    private purchaserService: PurchaserService,
    public authService: AuthService
  ) {
    console.log('User in component:', this.authService.getCurrentUser());
  }

  ngOnInit(): void {
    this.loadPurchasers();
  }

  loadPurchasers(): void {
    this.purchaserService.getAllPurchasers().subscribe(
      data => this.purchasers = data
    );
  }

  onAdd(): void {
    this.selectedPurchaser = { name: '', email: '' };
    this.isEditing = false;
  }

  onEdit(purchaser: PurchaserDto): void {
    this.selectedPurchaser = { ...purchaser };
    this.isEditing = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to remove this purchaser?')) {
      this.purchaserService.deletePurchaser(id).subscribe(() => {
        this.loadPurchasers();
      });
    }
  }

  onSubmit(): void {
    if (!this.selectedPurchaser) return;

    if (this.isEditing && this.selectedPurchaser.id) {
      this.purchaserService.updatePurchaser(this.selectedPurchaser.id, this.selectedPurchaser)
        .subscribe(() => {
          this.loadPurchasers();
          this.selectedPurchaser = null;
        });
    } else {
      this.purchaserService.createPurchaser(this.selectedPurchaser)
        .subscribe(() => {
          this.loadPurchasers();
          this.selectedPurchaser = null;
        });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}


