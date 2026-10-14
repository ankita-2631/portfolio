import { Component, input } from '@angular/core';
import { RevealDirective } from './motion.directives';

@Component({
  selector: 'app-section-heading',
  imports: [RevealDirective],
  host: { class: 'block' },
  template: `
    <div [appReveal]="0" class="mb-12 max-w-2xl">
      <p class="font-mono text-sm tracking-widest text-accent uppercase">{{ eyebrow() }}</p>
      <h2 [id]="headingId()" class="mt-2 font-display text-3xl font-bold sm:text-4xl">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="mt-3 text-muted">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly headingId = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
