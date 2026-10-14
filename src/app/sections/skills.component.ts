import { Component, ElementRef, Injector, afterNextRender, inject, signal } from '@angular/core';
import { animate } from 'motion';
import { skillCategories, skills } from '../content';
import type { SkillCategory } from '../content';
import { IconComponent } from '../ui/icons.component';
import { RevealDirective, prefersReducedMotion } from '../ui/motion.directives';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-skills',
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  host: { class: 'block' },
  template: `
    <section id="skills" aria-labelledby="skills-title" class="mx-auto max-w-6xl px-5 py-24">
      <app-section-heading
        headingId="skills-title"
        eyebrow="03 · Skills"
        title="Tools I work with"
        subtitle="Filter by area. Sparkles mark skills I'm actively growing."
      />
      <div [appReveal]="0">
        <div role="group" aria-label="Filter skills by category" class="mb-8 flex flex-wrap gap-2">
          @for (c of categories; track c) {
            <button
              (click)="select(c)"
              [attr.aria-pressed]="filter() === c"
              class="rounded-full border px-4 py-1.5 text-sm transition"
              [class]="
                filter() === c
                  ? 'border-transparent bg-gradient-to-r from-accent to-accent2 text-white'
                  : 'border-line text-muted hover:border-accent hover:text-ink'
              "
            >
              {{ c }}
            </button>
          }
        </div>
        <ul class="flex flex-wrap gap-3">
          @for (s of visible(); track s.name) {
            <li
              [attr.data-skill]="s.name"
              class="skill-item flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 shadow-sm transition hover:-translate-y-1 hover:border-accent"
            >
              {{ s.name }}
              @if (s.growing) {
                <app-icon name="sparkles" [size]="14" class="text-accent2" />
                <span class="sr-only">(currently growing)</span>
              }
              <span class="font-mono text-xs text-muted">{{ s.category }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly categories = ['All', ...skillCategories] as const;
  protected readonly filter = signal<SkillCategory | 'All'>('All');
  protected readonly visible = signal(skills);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private previous = new Map<string, DOMRect>();

  private measure() {
    const rects = new Map<string, DOMRect>();
    this.host.querySelectorAll<HTMLElement>('[data-skill]').forEach((el) => rects.set(el.dataset['skill']!, el.getBoundingClientRect()));
    return rects;
  }

  protected select(c: SkillCategory | 'All') {
    this.filter.set(c);
    this.previous = this.measure();
    this.visible.set(c === 'All' ? skills : skills.filter((s) => s.category === c));

    // Once the new list is rendered, glide surviving chips from their old spot and pop new ones in.
    afterNextRender(() => {
      if (prefersReducedMotion()) return;
      this.host.querySelectorAll<HTMLElement>('[data-skill]').forEach((el) => {
        const before = this.previous.get(el.dataset['skill']!);
        if (!before) {
          animate(el, { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.3 });
          return;
        }
        const after = el.getBoundingClientRect();
        const dx = before.left - after.left;
        const dy = before.top - after.top;
        if (dx || dy) {
          animate(el, { x: [dx, 0], y: [dy, 0] }, { type: 'spring', stiffness: 300, damping: 30 });
        }
      });
    }, { injector: this.injector });
  }

  private readonly injector = inject(Injector);
}

