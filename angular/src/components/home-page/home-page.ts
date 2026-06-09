import { Component } from '@angular/core';
import { Slider } from '../slider/slider';
import { Products } from '../products/products';

@Component({
  selector: 'app-home-page',
  imports: [Slider, Products],
  templateUrl: './home-page.html',
})
export class HomePage {}
