import { Component, OnInit, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { Product } from '../../models/products-data';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCard],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  protected productService = inject(ProductService);
  protected cart = inject(CartService);

  products = signal<Product[]>([]);
  searchTerm = signal('');
  selectedCategory = signal('all');
  selectedBrand = signal('all');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  inStockOnly = signal(false);

  categories = computed(() => Array.from(new Set(this.products().map((p) => p.category))).sort());
  brands = computed(() => Array.from(new Set(this.products().map((p) => p.brand).filter((b) => !!b))).sort());

  filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.products().filter((p) => {
      if (term && !p.title.toLowerCase().includes(term)) return false;
      if (this.selectedCategory() !== 'all' && p.category !== this.selectedCategory()) return false;
      if (this.selectedBrand() !== 'all' && p.brand !== this.selectedBrand()) return false;
      if (this.minPrice() !== null && p.price < this.minPrice()!) return false;
      if (this.maxPrice() !== null && p.price > this.maxPrice()!) return false;
      if (this.inStockOnly() && p.stock <= 0) return false;
      return true;
    });
  });

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((list) => this.products.set(list));
  }

  isSelected(id: number): boolean {
    return this.cart.isSelected(id);
  }

  isBought(id: number): boolean {
    return this.cart.isBought(id);
  }

  onSelect(id: number): void {
    this.cart.toggleSelected(id);
  }

  onBuy(product: Product): void {
    this.cart.buy(product);
  }

  onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productService.removeProductLocally(id);
      this.products.update((list) => list.filter((p) => p.id !== id));
    });
  }

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  onBrandChange(event: Event): void {
    this.selectedBrand.set((event.target as HTMLSelectElement).value);
  }

  onMinPriceChange(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.minPrice.set(v === '' ? null : Number(v));
  }

  onMaxPriceChange(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.maxPrice.set(v === '' ? null : Number(v));
  }

  toggleInStock(): void {
    this.inStockOnly.update((v) => !v);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('all');
    this.selectedBrand.set('all');
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.inStockOnly.set(false);
  }
}
