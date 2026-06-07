import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductsData } from '../../models/products-data';
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
  private data = new ProductsData();
  private cart = inject(CartService);
  private cdr = inject(ChangeDetectorRef);
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.product = this.data.getById(id);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
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
