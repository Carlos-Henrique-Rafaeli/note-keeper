import { Component, inject } from '@angular/core';
import { ShellComponent } from './components/shared/shell/shell.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './components/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ShellComponent, RouterOutlet, AsyncPipe],
  template: `
    @if (accessToken$ | async; as accessToken) {
      <app-shell
        [usuarioAutenticado]="accessToken.usuarioAutenticado"
        (logoutRequisitado)="logout()"
      >
        <router-outlet></router-outlet>
      </app-shell>
    } @else {
      <main class="container-fluid py-3">
        <router-outlet></router-outlet>
      </main>
    }
  `,
})
export class App {
  private readonly authService = inject(AuthService);

  protected readonly accessToken$ = this.authService.accessToken$;

  public logout() {
    console.log('Logout requisitado');
  }
}
