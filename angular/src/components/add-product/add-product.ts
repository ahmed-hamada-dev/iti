import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-product.html',
})
export class AddProduct implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categories: string[];
  brands: string[];
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

  constructor() {
    const products = this.productService.getAllProducts();
    this.categories = [...new Set(products.map((p) => p.category))].sort();
    this.brands = [...new Set(products.map((p) => p.brand).filter((b) => !!b))].sort();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = Number(id);
      this.isEdit = true;
      const product = this.productService.getProductById(this.editId);
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
    }
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      if (this.isEdit && this.editId !== null) {
        this.productService.updateProduct(this.editId, this.model);
      } else {
        this.productService.addProduct(this.model);
      }
      this.router.navigate(['/']);
    }
  }
}
