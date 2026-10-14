import { Component, signal } from '@angular/core';
import { experience } from '../content';
import { IconComponent } from '../ui/icons.component';
import { RevealDirective } from '../ui/motion.directives';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-experience',
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  host: { class: 'block' },
  template: `
    <section id="experience" aria-labelledby="exp-title" class="bg-surface2/50 py-24">
      <div class="mx-auto max-w-6xl px-5">
        <app-section-heading
          headingId="exp-title"
          eyebrow="02 · Experience"
          title="Where I've been building"
          subtitle="Click a focus area to see what I do day to day."
        />
        <div [appReveal]="0">
          <div class="relative border-l-2 border-line pl-8">
            <span class="absolute top-0 -left-[17px] grid size-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-white">
              <app-icon name="briefcase" [size]="16" />
            </span>
            <h3 class="font-display text-2xl font-semibold">{{ exp.role }}</h3>
            <p class="mt-1 text-muted">
              <span class="font-medium text-accent">{{ exp.company }}</span> · {{ exp.period }} · {{ exp.location }}
            </p>

            <div class="mt-6 space-y-3">
              @for (g of exp.groups; track g.title; let i = $index) {
                <div class="overflow-hidden rounded-xl border border-line bg-surface">
                  <h4>
                    <button
                      (click)="openIdx.set(openIdx() === i ? -1 : i)"
                      [attr.aria-expanded]="openIdx() === i"
                      class="flex w-full items-center justify-between px-5 py-4 text-left font-medium"
                    >
                      {{ g.title }}
                      <app-icon
                        name="chevron-down"
                        [size]="18"
                        class="text-muted transition-transform"
                        [class.rotate-180]="openIdx() === i"
                      />
                    </button>
                  </h4>
                  <div
                    class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                    [style.grid-template-rows]="openIdx() === i ? '1fr' : '0fr'"
                    [style.opacity]="openIdx() === i ? 1 : 0"
                    [attr.inert]="openIdx() === i ? null : ''"
                  >
                    <ul class="space-y-2 overflow-hidden px-5 text-muted">
                      @for (pt of g.points; track pt) {
                        <li class="flex gap-3">
                          <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"></span>
                          {{ pt }}
                        </li>
                      }
                      <li aria-hidden="true" class="h-2"></li>
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  protected readonly exp = experience;
  protected readonly openIdx = signal(0);
}
