import { Component } from '@angular/core';
import { profile } from './content';
import { AboutComponent } from './sections/about.component';
import { CertificationsComponent } from './sections/certifications.component';
import { ContactComponent } from './sections/contact.component';
import { ExperienceComponent } from './sections/experience.component';
import { GrowthComponent } from './sections/growth.component';
import { HeroComponent } from './sections/hero.component';
import { NavbarComponent } from './sections/navbar.component';
import { ProjectsComponent } from './sections/projects.component';
import { SkillsComponent } from './sections/skills.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    GrowthComponent,
    CertificationsComponent,
    ContactComponent,
  ],
  template: `
    <a
      href="#about"
      class="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-experience />
      <app-skills />
      <app-projects />
      <app-growth />
      <app-certifications />
      <app-contact />
    </main>
    <footer class="border-t border-line py-8 text-center text-sm text-muted">
      © {{ year }} {{ name }}. Built with Angular, TypeScript, Tailwind CSS &amp; Motion.
    </footer>
  `,
})
export class App {
  protected readonly year = new Date().getFullYear();
  protected readonly name = profile.name;
}
