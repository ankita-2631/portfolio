import { Component, DestroyRef, ElementRef, afterNextRender, inject, input, output, signal, viewChild } from '@angular/core';
import { animate } from 'motion';
import { projects } from '../content';
import type { Project } from '../content';
import { IconComponent } from '../ui/icons.component';
import { RevealDirective, TiltDirective, prefersReducedMotion } from '../ui/motion.directives';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-case-study',
  imports: [IconComponent],
  template: `
    <div
      #backdrop
      class="grid h-full w-full place-items-center bg-black/60 p-4 backdrop-blur-sm"
      (click)="requestClose()"
    >
      <div
        #panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        (click)="$event.stopPropagation()"
        class="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-2xl sm:p-8"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-mono text-sm text-accent">Case study</p>
            <h3 id="case-title" class="mt-1 font-display text-2xl font-bold sm:text-3xl">{{ project().title }}</h3>
          </div>
          <button
            #closeBtn
            (click)="requestClose()"
            aria-label="Close case study"
            class="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted hover:text-ink"
          >
            <app-icon name="x" [size]="18" />
          </button>
        </div>

        <div class="mt-6 space-y-6">
          <div>
            <h4 class="font-display text-lg font-semibold">The challenge</h4>
            <p class="mt-1 text-muted">{{ project().problem }}</p>
          </div>
          <div>
            <h4 class="mb-3 font-display text-lg font-semibold">Solution flow</h4>
            <ol aria-label="Solution flow" class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              @for (s of project().flow; track s; let last = $last) {
                <li class="flex flex-1 flex-col items-center gap-2 sm:flex-row">
                  <div class="w-full flex-1 rounded-xl border border-accent/40 bg-accent/10 px-3 py-3 text-center text-sm font-medium">{{ s }}</div>
                  @if (!last) {
                    <svg aria-hidden="true" viewBox="0 0 40 12" class="h-3 w-10 shrink-0 rotate-90 text-accent sm:rotate-0">
                      <path d="M0 6h34" class="flow-line" stroke="currentColor" stroke-width="2" fill="none" />
                      <path d="M30 1l8 5-8 5" stroke="currentColor" stroke-width="2" fill="none" />
                    </svg>
                  }
                </li>
              }
            </ol>
          </div>
          <div>
            <h4 class="font-display text-lg font-semibold">My approach</h4>
            <ul class="mt-2 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
              @for (a of project().approach; track a) {
                <li>{{ a }}</li>
              }
            </ul>
          </div>
          <div>
            <h4 class="font-display text-lg font-semibold">Impact</h4>
            <ul class="mt-2 list-disc space-y-1.5 pl-5 text-muted marker:text-accent2">
              @for (o of project().outcomes; track o) {
                <li>{{ o }}</li>
              }
            </ul>
          </div>
          @if (project().links; as links) {
            <ul class="flex flex-wrap gap-3" aria-label="Project links">
              @for (l of links; track l.href) {
                <li>
                  <a
                    [href]="l.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent hover:bg-accent/10"
                  >
                    {{ l.label }}
                    <app-icon name="arrow-up-right" [size]="14" />
                  </a>
                </li>
              }
            </ul>
          }
          <ul class="flex flex-wrap gap-2" aria-label="Technologies used">
            @for (t of project().stack; track t) {
              <li class="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">{{ t }}</li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'fixed inset-0 z-50 block',
    '(document:keydown.escape)': 'requestClose()',
  },
})
export class CaseStudyComponent {
  readonly project = input.required<Project>();
  readonly closed = output<void>();
  private readonly backdrop = viewChild.required<ElementRef<HTMLElement>>('backdrop');
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private readonly closeBtn = viewChild.required<ElementRef<HTMLElement>>('closeBtn');
  private readonly previousFocus = document.activeElement as HTMLElement | null;
  private leaving = false;

  constructor() {
    document.body.style.overflow = 'hidden';
    inject(DestroyRef).onDestroy(() => {
      document.body.style.overflow = '';
      this.previousFocus?.focus();
    });
    afterNextRender(() => {
      this.closeBtn().nativeElement.focus();
      if (prefersReducedMotion()) return;
      animate(this.backdrop().nativeElement, { opacity: [0, 1] }, { duration: 0.25 });
      animate(this.panel().nativeElement, { opacity: [0, 1], transform: ['translateY(40px) scale(0.96)', 'translateY(0px) scale(1)'] }, { duration: 0.35, ease: [0.22, 1, 0.36, 1] });
    });
  }

  protected requestClose() {
    if (this.leaving) return;
    this.leaving = true;
    if (prefersReducedMotion()) {
      this.closed.emit();
      return;
    }
    animate(this.backdrop().nativeElement, { opacity: 0 }, { duration: 0.2 });
    animate(this.panel().nativeElement, { opacity: 0, transform: 'translateY(40px) scale(0.96)' }, { duration: 0.2 }).finished.then(() =>
      this.closed.emit(),
    );
  }
}

@Component({
  selector: 'app-projects',
  imports: [SectionHeadingComponent, RevealDirective, TiltDirective, IconComponent, CaseStudyComponent],
  host: { class: 'block' },
  template: `
    <section id="projects" aria-labelledby="projects-title" class="bg-surface2/50 py-24">
      <div class="mx-auto max-w-6xl px-5">
        <app-section-heading
          headingId="projects-title"
          eyebrow="04 · Projects"
          title="Selected case studies"
          subtitle="Open a project to see the challenge, approach and impact."
        />
        <div class="grid gap-6 md:grid-cols-2">
          @for (p of projects; track p.id; let i = $index) {
            <div [appReveal]="i * 0.1">
              <div appTilt class="h-full">
                <button
                  (click)="selected.set(p)"
                  class="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 text-left transition hover:border-accent"
                >
                  <div class="absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 blur-2xl transition group-hover:scale-125"></div>
                  <div class="relative">
                    <div class="gradient-text font-display text-5xl font-bold">{{ p.metric.value }}</div>
                    <p class="text-sm text-muted">{{ p.metric.label }}</p>
                    <h3 class="mt-6 font-display text-xl font-semibold">{{ p.title }}</h3>
                    <p class="mt-2 text-muted">{{ p.tagline }}</p>
                    <ul class="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                      @for (t of p.stack; track t) {
                        <li class="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{{ t }}</li>
                      }
                    </ul>
                    <span class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Read case study
                      <app-icon name="arrow-up-right" [size]="16" class="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          }
        </div>
      </div>
      @if (selected(); as project) {
        <app-case-study [project]="project" (closed)="selected.set(null)" />
      }
    </section>
  `,
})
export class ProjectsComponent {
  protected readonly projects = projects;
  protected readonly selected = signal<Project | null>(null);
}
