import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/products-data';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { ImageZoomDirective } from '../../directives/image-zoom.directive';

@Component({
  selector: 'app-product-card',
  imports: [ShortDescriptionPipe, ImageZoomDirective, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  @Input() isSelected: boolean = false;
  @Input() isBought: boolean = false;

  @Output() select = new EventEmitter<number>();
  @Output() buy = new EventEmitter<Product>();

  showFull: boolean = false;

  private cdr = inject(ChangeDetectorRef);

  toggleDescription(): void {
    this.showFull = !this.showFull;
    this.cdr.detectChanges();
  }

  onSelect(): void {
    this.select.emit(this.product.id);
  }

  onBuy(): void {
    if (this.product.stock <= 0 || this.isBought) return;
    this.buy.emit(this.product);
  }
}
