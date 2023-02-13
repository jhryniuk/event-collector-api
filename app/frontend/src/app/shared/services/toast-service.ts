import {Injectable, TemplateRef} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ToastService {
  public toasts: unknown[] = [];

  public show(textOrTpl: string | TemplateRef<unknown>, options: unknown = {}) {
    this.toasts.push({textOrTpl, ...options});
  }

  public remove(toast: unknown) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  public clear() {
    this.toasts.slice(0, this.toasts.length);
  }
}
