import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/products-data';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { ImageZoomDirective } from '../../directives/image-zoom.directive';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShortDescriptionPipe, ImageZoomDirective, DecimalPipe, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Input() isSelected = false;
  @Input() isBought = false;

  @Output() select = new EventEmitter<number>();
  @Output() buy = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  showFull = signal(false);

  toggleDescription(): void {
    this.showFull.update((v) => !v);
  }

  onSelect(): void {
    this.select.emit(this.product.id);
  }

  onBuy(): void {
    if (this.product.stock <= 0 || this.isBought) return;
    this.buy.emit(this.product);
  }

  onDelete(): void {
    this.delete.emit(this.product.id);
  }
}
