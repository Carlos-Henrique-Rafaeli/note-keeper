import { Component } from '@angular/core';
import { ShellComponent } from './components/shared/shell/shell.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ShellComponent, RouterOutlet],
  templateUrl: './app.html',
})
export class App {}
