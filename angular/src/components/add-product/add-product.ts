import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products-data';

@Component({
  selector: 'app-add-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-product.html',
})
export class AddProduct implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categories = signal<string[]>([]);
  brands = signal<string[]>([]);
  isEdit = signal(false);
  editId: number | null = null;

  model = {
    title: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    brand: '',
    image: '',
  };

  submitted = signal(false);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.categories.set([...new Set(products.map((p) => p.category))].sort());
      this.brands.set([...new Set(products.map((p) => p.brand).filter((b) => !!b))].sort());
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = Number(id);
      this.isEdit.set(true);
      this.productService.getProductById(this.editId).subscribe((product) => {
        if (product) {
          this.model = {
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
            brand: product.brand,
            image: product.image,
          };
        }
      });
    }
  }

  onSubmit(form: NgForm): void {
    this.submitted.set(true);
    if (form.valid) {
      const obs = this.isEdit() && this.editId !== null
        ? this.productService.updateProduct(this.editId, this.model as any)
        : this.productService.addProduct(this.model as Product);
      obs.subscribe(() => this.router.navigate(['/']));
    }
  }
}
