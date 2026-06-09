import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/products-data';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ImageZoomDirective } from '../../directives/image-zoom.directive';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, ImageZoomDirective, ShortDescriptionPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, OnDestroy {
  product?: Product;
  showFull: boolean = false;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cart = inject(CartService);
  private cdr = inject(ChangeDetectorRef);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));
        this.productService.getProductById(id).subscribe((product) => {
          this.product = product;
          this.cdr.detectChanges();
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  toggleDescription(): void {
    this.showFull = !this.showFull;
  }

  buy(): void {
    if (this.product) {
      this.cart.buy(this.product);
      this.cdr.detectChanges();
    }
  }

  get isBought(): boolean {
    return this.product ? this.cart.isBought(this.product.id) : false;
  }
}
