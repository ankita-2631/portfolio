import { Component } from '@angular/core';
import { certifications, education } from '../content';
import { IconComponent } from '../ui/icons.component';
import { RevealDirective, TiltDirective } from '../ui/motion.directives';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-certifications',
  imports: [SectionHeadingComponent, RevealDirective, TiltDirective, IconComponent],
  host: { class: 'block' },
  template: `
    <section id="certifications" aria-labelledby="cert-title" class="bg-surface2/50 py-24">
      <div class="mx-auto max-w-6xl px-5">
        <app-section-heading headingId="cert-title" eyebrow="06 · Credentials" title="Certifications & education" />
        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (c of certs; track c.name; let i = $index) {
            <li>
              <div [appReveal]="i * 0.07" class="h-full">
                <div appTilt class="h-full">
                  <div class="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                    <div [class]="'grid size-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ' + c.hue">
                      <app-icon name="award" [size]="26" />
                    </div>
                    <div>
                      <h3 class="font-medium">{{ c.name }}</h3>
                      <p class="text-sm text-muted">
                        {{ c.issuer }} · <span class="font-mono">{{ c.code }}</span>
                      </p>
                      <p class="mt-1 text-xs text-accent">{{ c.level }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          }
        </ul>

        <h3 class="mt-16 mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
          <app-icon name="graduation-cap" class="text-accent" /> Education
        </h3>
        <ul class="grid gap-5 md:grid-cols-2">
          @for (e of edu; track e.degree; let i = $index) {
            <li>
              <div [appReveal]="i * 0.1">
                <div class="rounded-2xl border border-line bg-surface p-6">
                  <p class="gradient-text font-display text-3xl font-bold">{{ e.degree }}</p>
                  <p class="mt-1 font-medium">{{ e.full }}</p>
                  <p class="text-sm text-muted">{{ e.school }} · {{ e.period }}</p>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class CertificationsComponent {
  protected readonly certs = certifications;
  protected readonly edu = education;
}
