import { Component, DestroyRef, ElementRef, afterNextRender, inject, input, signal, viewChild } from '@angular/core';
import { IconComponent } from '../ui/icons.component';
import { profile } from '../content';

@Component({
  selector: 'app-email-menu',
  imports: [IconComponent],
  host: { class: 'relative block', '(document:pointerdown)': 'onDocPointer($event)', '(document:keydown.escape)': 'open.set(false)' },
  template: `
    <button
      (click)="open.set(!open())"
      aria-label="Email me"
      aria-haspopup="menu"
      [attr.aria-expanded]="open()"
      class="grid size-12 place-items-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent hover:text-accent"
    >
      <app-icon name="mail" [size]="18" />
    </button>
    @if (open()) {
      <div role="menu" class="glass absolute top-14 left-0 z-20 w-64 rounded-xl p-1.5 shadow-xl">
        <a
          role="menuitem"
          [href]="gmailUrl"
          target="_blank"
          rel="noopener noreferrer"
          [class]="itemClass"
          (click)="open.set(false)"
        >
          <app-icon name="external-link" [size]="16" class="text-accent" /> Compose in Gmail
        </a>
        <a role="menuitem" [href]="'mailto:' + email" [class]="itemClass" (click)="open.set(false)">
          <app-icon name="mail" [size]="16" class="text-accent" /> Open default mail app
        </a>
        <button role="menuitem" (click)="copy()" [class]="itemClass">
          <app-icon [name]="copied() ? 'check' : 'copy'" [size]="16" [class]="copied() ? 'text-emerald-500' : 'text-accent'" />
          {{ copied() ? 'Copied!' : email }}
        </button>
      </div>
    }
  `,
})
export class EmailMenuComponent {
  protected readonly email = profile.email;
  protected readonly gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`;
  protected readonly itemClass =
    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-accent/10';
  protected readonly open = signal(false);
  protected readonly copied = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onDocPointer(e: Event) {
    if (this.open() && !this.host.contains(e.target as Node)) this.open.set(false);
  }

  // mailto: does nothing on machines without a configured mail app, so offer reliable alternatives.
  protected async copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const t = document.createElement('textarea');
      t.value = profile.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
