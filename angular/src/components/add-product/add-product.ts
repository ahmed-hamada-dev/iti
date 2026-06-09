import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products-data';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-product.html',
})
export class AddProduct implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categories: string[] = [];
  brands: string[] = [];
  isEdit = false;
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

  submitted = false;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.categories = [...new Set(products.map((p) => p.category))].sort();
      this.brands = [...new Set(products.map((p) => p.brand).filter((b) => !!b))].sort();
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = Number(id);
      this.isEdit = true;
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
    this.submitted = true;
    if (form.valid) {
      const obs = this.isEdit && this.editId !== null
        ? this.productService.updateProduct(this.editId, this.model as any)
        : this.productService.addProduct(this.model as Product);
      obs.subscribe(() => this.router.navigate(['/']));
    }
  }
}
