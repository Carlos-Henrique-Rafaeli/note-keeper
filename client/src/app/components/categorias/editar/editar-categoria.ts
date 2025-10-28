import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, map, tap, shareReplay, Observer, take, switchMap } from 'rxjs';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import {
  DetalhesCategoriaModel,
  EditarCategoriaModel,
  EditarCategoriaResponseModel,
} from '../categoria.models';
import { CategoriaService } from '../categoria.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editar-categorias',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-categoria.html',
})
export class EditarCategoria {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly categoriaService = inject(CategoriaService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected categoriaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  protected readonly categoria$ = this.route.data.pipe(
    filter((data) => data['categoria']),
    map((data) => data['categoria'] as DetalhesCategoriaModel),
    tap((categoria) => this.categoriaForm.patchValue(categoria)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public editar() {
    if (this.categoriaForm.invalid) return;

    const editarCategoriaModel: EditarCategoriaModel = this.categoriaForm.value;

    const edicaoObserver: Observer<EditarCategoriaResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `O registro "${editarCategoriaModel.titulo}" foi editado com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/categorias']),
    };

    this.categoria$
      .pipe(
        take(1),
        switchMap((categoria) => this.categoriaService.editar(categoria.id, editarCategoriaModel)),
      )
      .subscribe(edicaoObserver);
  }
}
