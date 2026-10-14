import { Component } from '@angular/core';
import { profile, stats } from '../content';
import { CounterComponent } from '../ui/counter.component';
import { RevealDirective } from '../ui/motion.directives';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-about',
  imports: [SectionHeadingComponent, RevealDirective, CounterComponent],
  host: { class: 'block' },
  template: `
    <section id="about" aria-labelledby="about-title" class="mx-auto max-w-6xl px-5 py-24">
      <app-section-heading headingId="about-title" eyebrow="01 · About" title="Engineer. Automator. Lifelong learner." />
      <div class="grid gap-10 lg:grid-cols-2">
        <div [appReveal]="0" class="space-y-4 text-lg text-muted">
          <p>
            I'm a detail-oriented, results-driven software engineer at <strong class="text-ink">{{ company }}</strong>, where I design and
            maintain enterprise applications with <strong class="text-ink">C# .NET, Angular and SQL Server</strong>, from the ERP modules
            that run inventory, billing and finance to the APIs that connect them.
          </p>
          <p>
            Alongside traditional development I use <strong class="text-ink">Power Apps and Power Automate</strong> to remove manual work
            with approval and compliance workflows, and I hold certifications across
            <strong class="text-ink">Azure, Google Cloud, AI and the Power Platform</strong>.
          </p>
          <p>
            My next chapter is about <strong class="text-ink">Python, AI and cloud-native engineering</strong>: turning solid enterprise
            foundations into intelligent, scalable solutions.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          @for (s of stats; track s.label; let i = $index) {
            <div [appReveal]="i * 0.08">
              <div class="h-full rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent">
                <div class="gradient-text font-display text-4xl font-bold">
                  <app-counter [to]="s.years ? years : s.value" [suffix]="s.suffix" />
                </div>
                <p class="mt-2 text-sm text-muted">{{ s.label }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly company = profile.company;
  protected readonly stats = stats;
  protected readonly years = new Date().getFullYear() - profile.startYear;
}
