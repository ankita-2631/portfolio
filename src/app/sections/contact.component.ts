import { Component, signal } from '@angular/core';
import { profile } from '../content';
import { BrandIconComponent, IconComponent } from '../ui/icons.component';
import { RevealDirective } from '../ui/motion.directives';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-contact',
  imports: [SectionHeadingComponent, RevealDirective, IconComponent, BrandIconComponent],
  host: { class: 'block' },
  template: `
    <section id="contact" aria-labelledby="contact-title" class="mx-auto max-w-6xl px-5 py-24">
      <app-section-heading
        headingId="contact-title"
        eyebrow="07 · Contact"
        title="Let's build something together"
        subtitle="Open to full-stack, cloud and AI-focused opportunities and collaborations."
      />
      <div class="grid gap-10 lg:grid-cols-2">
        <div [appReveal]="0" class="space-y-5">
          <p class="flex items-center gap-2 text-muted">
            <app-icon name="map-pin" [size]="18" class="text-accent" /> {{ p.location }}
          </p>
          <button
            (click)="copyEmail()"
            class="inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-3 font-mono text-sm transition hover:border-accent"
          >
            {{ p.email }}
            <app-icon [name]="copied() ? 'check' : 'copy'" [size]="16" [class]="copied() ? 'text-emerald-400' : 'text-muted'" />
            <span class="sr-only" role="status">{{ copied() ? 'Email copied' : 'Copy email address' }}</span>
          </button>
          <a [href]="p.phoneHref" class="flex w-fit items-center gap-2 text-muted transition hover:text-accent">
            <app-icon name="phone" [size]="18" class="text-accent" /> {{ p.phone }}
          </a>
          @if (socials.length > 0) {
            <div class="flex gap-3">
              @for (s of socials; track s.label) {
                <a
                  [href]="s.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
                >
                  <app-brand-icon [name]="s.icon" class="size-4" /> {{ s.label }}
                </a>
              }
            </div>
          }
        </div>

        <div [appReveal]="0.1">
          <form (submit)="onSubmit($event)" class="space-y-4">
            <div>
              <label for="name" class="mb-1 block text-sm text-muted">Name</label>
              <input id="name" name="name" required autocomplete="name" [class]="field" placeholder="Your name" />
            </div>
            <div>
              <label for="email" class="mb-1 block text-sm text-muted">Email</label>
              <input id="email" name="email" type="email" required autocomplete="email" [class]="field" placeholder="you&#64;example.com" />
            </div>
            <div>
              <label for="message" class="mb-1 block text-sm text-muted">Message</label>
              <textarea id="message" name="message" required rows="5" [class]="field" placeholder="How can I help?"></textarea>
            </div>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent2 px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 transition hover:scale-[1.03]"
            >
              Send message <app-icon name="send" [size]="16" />
            </button>
            <p class="text-sm text-muted">
              No mail app set up?
              <a [href]="gmailUrl" target="_blank" rel="noopener noreferrer" class="text-accent underline underline-offset-2">Compose in Gmail</a>
              or copy my address on the left.
            </p>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly p = profile;
  protected readonly copied = signal(false);
  protected readonly gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`;
  protected readonly field =
    'w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none transition placeholder:text-muted/70 focus:border-accent';
  protected readonly socials = (
    [
      { href: profile.github, label: 'GitHub', icon: 'github' },
      { href: profile.linkedin, label: 'LinkedIn', icon: 'linkedin' },
    ] as const
  ).filter((s) => s.href);

  protected async copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  // No backend needed: the form opens the visitor's email client with the message prefilled.
  protected onSubmit(e: Event) {
    e.preventDefault();
    const f = new FormData(e.target as HTMLFormElement);
    const subject = encodeURIComponent(`Portfolio enquiry from ${f.get('name')}`);
    const body = encodeURIComponent(`${f.get('message')}\n\n- ${f.get('name')} (${f.get('email')})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }
}
