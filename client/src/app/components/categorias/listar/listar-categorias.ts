import { Component, inject } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-categorias',
  imports: [MatButtonModule, MatIconModule, MatCardModule, RouterLink, AsyncPipe],
  templateUrl: './listar-categorias.html',
})
export class ListarCategorias {
  protected readonly categoriaService = inject(CategoriaService);

  protected readonly categorias$ = this.categoriaService.selecionarTodas();
}
