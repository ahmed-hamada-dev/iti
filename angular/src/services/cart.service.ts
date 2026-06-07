import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products-data';

@Injectable({ providedIn: 'root' })
export class CartService {
  private total = 0;
  private boughtIds = new Set<number>();
  private selectedIds = new Set<number>();
  private totalSubject = new BehaviorSubject<number>(0);
  private selectedSubject = new BehaviorSubject<number[]>([]);

  total$ = this.totalSubject.asObservable();
  selected$ = this.selectedSubject.asObservable();

  isBought(id: number): boolean {
    return this.boughtIds.has(id);
  }

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }

  toggleSelected(id: number): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
    this.selectedSubject.next(Array.from(this.selectedIds));
  }

  buy(product: Product): void {
    if (this.boughtIds.has(product.id)) return;
    if (product.stock <= 0) return;
    this.boughtIds.add(product.id);
    this.total += product.price;
    this.totalSubject.next(this.total);
  }

  reset(): void {
    this.total = 0;
    this.boughtIds.clear();
    this.selectedIds.clear();
    this.totalSubject.next(0);
    this.selectedSubject.next([]);
  }
}
