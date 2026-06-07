import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { Slider } from '../components/slider/slider';

//? Decorator DP --> add new property in
@Component({
  selector: 'app-root',
  imports: [Header, Slider],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
