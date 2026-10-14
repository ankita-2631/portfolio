import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly dark = signal(this.doc.documentElement.classList.contains('dark'));

  constructor() {
    effect(() => {
      const dark = this.dark();
      this.doc.documentElement.classList.toggle('dark', dark);
      this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0a0e1a' : '#f6f7fb');
      try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
      } catch {
        // storage can be unavailable (private mode); theme just won't persist
      }
    });
  }

  toggle() {
    this.dark.update((d) => !d);
  }
}
