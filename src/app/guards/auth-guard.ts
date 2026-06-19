import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AutenticacaoService } from '../services/autenticacao.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const autenticacaoService = inject(AutenticacaoService);

  if (autenticacaoService.estaAutenticado()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};