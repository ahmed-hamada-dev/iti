import { Injectable } from '@angular/core';
import { Product, ProductsData } from '../models/products-data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[];

  constructor() {
    this.products = new ProductsData().products;
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  addProduct(product: Omit<Product, 'id' | 'discountPercentage' | 'rating' | 'tags' | 'images' | 'availabilityStatus'>): Product {
    const maxId = this.products.reduce((max, p) => Math.max(max, p.id), 0);
    const newProduct = new Product(
      maxId + 1,
      product.title,
      product.description ?? '',
      product.category,
      product.price,
      0,
      0,
      product.stock ?? 0,
      product.brand ?? '',
      [],
      product.image ?? '',
      [],
      'In Stock',
    );
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, changes: Partial<Product>): Product | undefined {
    const product = this.products.find((p) => p.id === id);
    if (!product) return undefined;
    Object.assign(product, changes);
    return product;
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}
