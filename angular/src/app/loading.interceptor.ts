import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, catchError, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.setLoading(true);
  loadingService.clearError();

  return next(req).pipe(
    catchError((error) => {
      const message = error?.error?.message || error?.message || 'Something went wrong';
      loadingService.setError(message);
      return throwError(() => error);
    }),
    finalize(() => loadingService.setLoading(false)),
  );
};
