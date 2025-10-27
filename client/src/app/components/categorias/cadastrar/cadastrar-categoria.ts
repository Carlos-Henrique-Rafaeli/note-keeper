import { Component, inject } from '@angular/core';
import { CadastrarCategoriaModel, CadastrarCategoriaResponseModel } from '../categoria.models';
import { Observer } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cadastrar-categorias',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-categoria.html',
})
export class CadastrarCategoria {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly categoriaService = inject(CategoriaService);
  protected readonly router = inject(Router);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected categoriaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  public cadastrar() {
    if (this.categoriaForm.invalid) return;

    const categoriaModel: CadastrarCategoriaModel = this.categoriaForm.value;

    const cadastroObserver: Observer<CadastrarCategoriaResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `O registro "${categoriaModel.titulo}" foi cadastrado com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/categorias']),
    };

    this.categoriaService.cadastrar(categoriaModel).subscribe(cadastroObserver);
  }
}
