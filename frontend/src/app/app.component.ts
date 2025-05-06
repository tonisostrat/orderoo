import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  constructor() {
    console.log('_ENV_', environment);
  }
}
