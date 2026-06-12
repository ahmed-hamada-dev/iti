import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/products-data';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ImageZoomDirective } from '../../directives/image-zoom.directive';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';

@Component({
  selector: 'app-product-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ImageZoomDirective, ShortDescriptionPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product = signal<Product | undefined>(undefined);
  showFull = signal(false);

  private route = inject(ActivatedRoute);
  protected productService = inject(ProductService);
  protected cart = inject(CartService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((p) => this.product.set(p));
  }

  toggleDescription(): void {
    this.showFull.update((v) => !v);
  }

  buy(): void {
    const p = this.product();
    if (p) this.cart.buy(p);
  }

  isBought(): boolean {
    const p = this.product();
    return p ? this.cart.isBought(p.id) : false;
  }
}
