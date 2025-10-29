import { Routes } from '@angular/router';
import { NotaService } from './nota.service';
import { ListarNotas } from './listar/listar-notas';
import { inject } from '@angular/core';

const listagemNotasResolver = () => {
  const notaService = inject(NotaService);

  return notaService.selecionarTodas();
};

export const notaRoutes: Routes = [
  {
    path: '',
    children: [{ path: '', component: ListarNotas, resolve: { notas: listagemNotasResolver } }],
    providers: [NotaService],
  },
];
