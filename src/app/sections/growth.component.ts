import { Component } from '@angular/core';
import { growthTracks } from '../content';
import { IconComponent } from '../ui/icons.component';
import { RevealDirective } from '../ui/motion.directives';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-growth',
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  host: { class: 'block' },
  template: `
    <section id="growth" aria-labelledby="growth-title" class="mx-auto max-w-6xl px-5 py-24">
      <app-section-heading
        headingId="growth-title"
        eyebrow="05 · Growth"
        title="Where I'm heading: Python, AI & Cloud"
        subtitle="Solid enterprise foundations, with a clear roadmap into intelligent, cloud-native engineering."
      />
      <div class="grid gap-6 md:grid-cols-3">
        @for (t of tracks; track t.id; let i = $index) {
          <div [appReveal]="i * 0.1">
            <article class="h-full rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent2">
              <h3 class="font-display text-xl font-semibold">
                <span class="gradient-text">{{ t.title }}</span>
              </h3>
              <p class="mt-2 text-sm text-muted">{{ t.blurb }}</p>
              <p class="mt-5 font-mono text-xs tracking-widest text-muted uppercase">Foundation</p>
              <ul class="mt-2 space-y-2">
                @for (d of t.done; track d) {
                  <li class="flex gap-2 text-sm">
                    <app-icon name="check" [size]="16" class="mt-0.5 shrink-0 text-emerald-400" />
                    {{ d }}
                  </li>
                }
              </ul>
              <p class="mt-5 font-mono text-xs tracking-widest text-muted uppercase">Next up</p>
              <ul class="mt-2 space-y-2">
                @for (n of t.next; track n) {
                  <li class="flex gap-2 text-sm text-muted">
                    <app-icon name="rocket" [size]="16" class="mt-0.5 shrink-0 text-accent2" />
                    {{ n }}
                  </li>
                }
              </ul>
            </article>
          </div>
        }
      </div>
    </section>
  `,
})
export class GrowthComponent {
  protected readonly tracks = growthTracks;
}
