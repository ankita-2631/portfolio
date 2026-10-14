import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { animate, scroll } from 'motion';
import { IconComponent } from '../ui/icons.component';
import { ThemeService } from '../ui/theme.service';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'growth', label: 'Growth' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

@Component({
  selector: 'app-navbar',
  imports: [IconComponent],
  template: `
    <header class="glass fixed inset-x-0 top-0 z-40 border-x-0 border-t-0">
      <div
        #bar
        class="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-accent to-accent2"
        style="transform: scaleX(0)"
      ></div>
      <nav aria-label="Primary" class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" class="font-display text-lg font-bold">
          <span class="gradient-text">AS</span><span class="text-muted">.dev</span>
        </a>
        <ul class="hidden items-center gap-1 lg:flex">
          @for (n of items; track n.id) {
            <li>
              <a
                [href]="'#' + n.id"
                [attr.aria-current]="active() === n.id ? 'true' : null"
                class="rounded-full px-3 py-1.5 text-sm transition-colors"
                [class]="active() === n.id ? 'bg-accent/15 text-accent' : 'text-muted hover:text-ink'"
              >
                {{ n.label }}
              </a>
            </li>
          }
        </ul>
        <div class="flex items-center gap-2">
          <button
            (click)="theme.toggle()"
            [attr.aria-label]="theme.dark() ? 'Switch to light theme' : 'Switch to dark theme'"
            class="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-ink"
          >
            <app-icon [name]="theme.dark() ? 'sun' : 'moon'" [size]="18" />
          </button>
          <button
            (click)="open.set(!open())"
            aria-label="Toggle menu"
            [attr.aria-expanded]="open()"
            aria-controls="mobile-menu"
            class="grid size-9 place-items-center rounded-full border border-line text-muted lg:hidden"
          >
            <app-icon [name]="open() ? 'x' : 'menu'" [size]="18" />
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        class="grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden"
        [style.grid-template-rows]="open() ? '1fr' : '0fr'"
        [style.opacity]="open() ? 1 : 0"
        [attr.inert]="open() ? null : ''"
      >
        <ul class="overflow-hidden border-t border-line px-5" [class.border-transparent]="!open()">
          @for (n of items; track n.id) {
            <li>
              <a [href]="'#' + n.id" (click)="open.set(false)" class="block py-3 text-muted hover:text-ink">{{ n.label }}</a>
            </li>
          }
        </ul>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly items = NAV_ITEMS;
  protected readonly active = signal('');
  protected readonly open = signal(false);
  private readonly bar = viewChild.required<ElementRef<HTMLElement>>('bar');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && this.active.set(e.target.id)),
        { rootMargin: '-45% 0px -50% 0px' },
      );
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      const barEl = this.bar().nativeElement;
      let current: { stop: () => void } | undefined;
      const stopScroll = scroll((progress: number) => {
        current?.stop();
        current = animate(barEl, { transform: `scaleX(${progress})` }, { type: 'spring', stiffness: 120, damping: 24 });
      });

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        stopScroll();
        current?.stop();
      });
    });
  }
}
