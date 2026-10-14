import { Component, DestroyRef, inject, signal } from '@angular/core';
import { profile } from '../content';
import { BrandIconComponent, IconComponent } from '../ui/icons.component';
import { EnterDirective, TiltDirective, prefersReducedMotion } from '../ui/motion.directives';
import { EmailMenuComponent } from './email-menu.component';
import { NeuralBackgroundComponent } from './neural-background.component';

@Component({
  selector: 'app-hero',
  imports: [IconComponent, BrandIconComponent, EnterDirective, TiltDirective, EmailMenuComponent, NeuralBackgroundComponent],
  host: { class: 'block' },
  template: `
    <section id="top" aria-label="Introduction" class="relative isolate flex min-h-screen items-center overflow-hidden pt-16">
      <div class="grid-bg absolute inset-0 -z-20"></div>
      <div class="absolute inset-0 -z-10">
        <app-neural-background />
      </div>
      <div class="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-accent2/25 blur-3xl"></div>
      <div class="absolute bottom-0 -left-24 -z-10 size-96 rounded-full bg-accent/20 blur-3xl"></div>

      <div class="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p
            [appEnter]="{ y: 16, duration: 0.5 }"
            class="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-muted"
          >
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
            </span>
            <app-icon name="map-pin" [size]="14" /> {{ p.location }}
          </p>

          <h1
            [appEnter]="{ delay: 0.1, y: 24, duration: 0.7 }"
            class="mt-6 font-display text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <span class="gradient-text">{{ p.name }}</span>
          </h1>

          <p
            [appEnter]="{ delay: 0.3, duration: 0.5 }"
            [attr.aria-label]="rolesLabel"
            class="mt-5 h-8 font-mono text-lg text-accent sm:text-xl"
          >
            <span aria-hidden="true">
              {{ '> ' + typed() }}<span class="caret ml-0.5 inline-block h-5 w-2 translate-y-1 bg-accent"></span>
            </span>
          </p>

          <p [appEnter]="{ delay: 0.45, duration: 0.5 }" class="mt-6 max-w-xl text-lg text-muted">{{ p.summary }}</p>

          <div [appEnter]="{ delay: 0.6, y: 16, duration: 0.5 }" class="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent2 px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 transition hover:scale-[1.03]"
            >
              View my work <app-icon name="arrow-down" [size]="16" />
            </a>
            <a
              [href]="p.resumeUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 font-medium transition hover:border-accent"
            >
              <app-icon name="download" [size]="16" /> Resume
            </a>
            <app-email-menu />
            @for (l of links; track l.label) {
              <a
                [href]="l.href"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="l.label"
                class="grid size-12 place-items-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent hover:text-accent"
              >
                <app-brand-icon [name]="l.icon" class="size-5" />
              </a>
            }
          </div>
        </div>

        <div [appEnter]="{ delay: 0.5, scale: 0.92, duration: 0.8 }" class="hidden lg:block">
          <div appTilt class="glass rounded-2xl p-1 shadow-2xl shadow-accent2/20">
            <div class="rounded-xl bg-surface/80 p-5 font-mono text-sm leading-7">
              <div class="mb-3 flex gap-2" aria-hidden="true">
                <span class="size-3 rounded-full bg-rose-400"></span>
                <span class="size-3 rounded-full bg-amber-400"></span>
                <span class="size-3 rounded-full bg-emerald-400"></span>
              </div>
              <div class="overflow-x-auto" role="img" aria-label="Quick profile snapshot"><code>
                <div class="whitespace-pre"><span class="text-accent2">const</span>&nbsp;<span class="text-accent">ankita</span> = &#123;</div>
                <div class="whitespace-pre">&nbsp;&nbsp;role: <span class="text-emerald-700 dark:text-emerald-400">'Full Stack Engineer'</span>,</div>
                <div class="whitespace-pre">&nbsp;&nbsp;stack: [<span class="text-emerald-700 dark:text-emerald-400">'.NET'</span>, <span class="text-emerald-700 dark:text-emerald-400">'Angular'</span>,</div>
                <div class="whitespace-pre">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-emerald-700 dark:text-emerald-400">'SQL Server'</span>],</div>
                <div class="whitespace-pre">&nbsp;&nbsp;cloud: [<span class="text-emerald-700 dark:text-emerald-400">'Azure'</span>, <span class="text-emerald-700 dark:text-emerald-400">'GCP'</span>],</div>
                <div class="whitespace-pre">&nbsp;&nbsp;automation: <span class="text-emerald-700 dark:text-emerald-400">'Power Platform'</span>,</div>
                <div class="whitespace-pre">&nbsp;&nbsp;learning: [<span class="text-emerald-700 dark:text-emerald-400">'Python'</span>, <span class="text-emerald-700 dark:text-emerald-400">'AI'</span>],</div>
                <div class="whitespace-pre">&nbsp;&nbsp;certified: <span class="text-amber-600 dark:text-amber-400">5</span>,</div>
                <div class="whitespace-pre">&#125;</div>
              </code></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly p = profile;
  protected readonly rolesLabel = profile.roles.join(', ');
  protected readonly links = (
    [
      { href: profile.github, label: 'GitHub', icon: 'github' },
      { href: profile.linkedin, label: 'LinkedIn', icon: 'linkedin' },
    ] as const
  ).filter((l) => l.href);

  protected readonly typed = signal(prefersReducedMotion() ? profile.roles[0] : '');

  constructor() {
    if (prefersReducedMotion()) return;
    const words = profile.roles;
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const text = this.typed();
      const word = words[i % words.length];
      let next = 60;
      if (!deleting && text === word) {
        deleting = true;
        next = 30;
      } else if (deleting && text === '') {
        deleting = false;
        i++;
      } else {
        const updated = word.slice(0, text.length + (deleting ? -1 : 1));
        this.typed.set(updated);
        next = !deleting && updated === word ? 1600 : deleting ? 30 : 60;
      }
      timer = setTimeout(tick, next);
    };
    timer = setTimeout(tick, 60);
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));
  }
}
