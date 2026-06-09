import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/products-data';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
})
export class Products implements OnInit, OnDestroy {
  products: Product[] = [];
  total: number = 0;

  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedBrand: string = 'all';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  inStockOnly: boolean = false;

  private productService = inject(ProductService);
  private cart = inject(CartService);
  private cdr = inject(ChangeDetectorRef);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
        this.cdr.detectChanges();
      }),
      this.cart.total$.subscribe((t) => {
        this.total = t;
        this.cdr.detectChanges();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  get categories(): string[] {
    return Array.from(new Set(this.products.map((p) => p.category))).sort();
  }

  get brands(): string[] {
    return Array.from(new Set(this.products.map((p) => p.brand).filter((b) => !!b))).sort();
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.products.filter((p) => {
      if (term && !p.title.toLowerCase().includes(term)) return false;
      if (this.selectedCategory !== 'all' && p.category !== this.selectedCategory) return false;
      if (this.selectedBrand !== 'all' && p.brand !== this.selectedBrand) return false;
      if (this.minPrice !== null && p.price < this.minPrice) return false;
      if (this.maxPrice !== null && p.price > this.maxPrice) return false;
      if (this.inStockOnly && p.stock <= 0) return false;
      return true;
    });
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
      this.products = this.products.filter((p) => p.id !== id);
      this.cdr.detectChanges();
    });
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
  }

  onBrandChange(event: Event): void {
    this.selectedBrand = (event.target as HTMLSelectElement).value;
  }

  onMinPriceChange(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.minPrice = v === '' ? null : Number(v);
  }

  onMaxPriceChange(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.maxPrice = v === '' ? null : Number(v);
  }

  toggleInStock(): void {
    this.inStockOnly = !this.inStockOnly;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedBrand = 'all';
    this.minPrice = null;
    this.maxPrice = null;
    this.inStockOnly = false;
  }
}
