import {Injectable, TemplateRef} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ToastService {
  public toasts: any[] = [];

  public show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, ...options});
  }

  public remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  public clear() {
    this.toasts.slice(0, this.toasts.length);
  }
}
