import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading = signal(false);
  private error = signal<string | null>(null);

  isLoading = this.loading.asReadonly();
  errorMessage = this.error.asReadonly();

  setLoading(v: boolean) {
    this.loading.set(v);
  }

  setError(msg: string | null) {
    this.error.set(msg);
  }

  clearError() {
    this.error.set(null);
  }
}
