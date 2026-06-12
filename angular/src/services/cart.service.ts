import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products-data';

@Injectable({ providedIn: 'root' })
export class CartService {
  private totalSignal = signal(0);
  private boughtIds = new Set<number>();
  private selectedIdsSignal = signal<number[]>([]);

  readonly total = this.totalSignal.asReadonly();
  readonly selectedIds = this.selectedIdsSignal.asReadonly();

  isBought(id: number): boolean {
    return this.boughtIds.has(id);
  }

  isSelected(id: number): boolean {
    return this.selectedIdsSignal().includes(id);
  }

  toggleSelected(id: number): void {
    this.selectedIdsSignal.update((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id],
    );
  }

  buy(product: Product): void {
    if (this.boughtIds.has(product.id)) return;
    if (product.stock <= 0) return;
    this.boughtIds.add(product.id);
    this.totalSignal.update((t) => t + product.price);
  }

  reset(): void {
    this.totalSignal.set(0);
    this.boughtIds.clear();
    this.selectedIdsSignal.set([]);
  }
}
