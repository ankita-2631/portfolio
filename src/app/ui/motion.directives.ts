import { DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { animate, inView } from 'motion';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fade/slide an element in once it scrolls into view.
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  readonly delay = input(0, { alias: 'appReveal' });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const reduced = prefersReducedMotion();
    const el = this.el;
    el.style.opacity = '0';
    if (!reduced) el.style.transform = 'translateY(28px)';

    const stop = inView(
      el,
      () => {
        animate(
          el,
          reduced ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' },
          { duration: 0.6, delay: Number(this.delay()) || 0, ease: [0.22, 1, 0.36, 1] },
        ).finished.then(() => {
          el.style.opacity = '';
          el.style.transform = '';
        });
      },
      { margin: '0px 0px -60px 0px' },
    );
    inject(DestroyRef).onDestroy(stop);
  }
}

// One-off entrance animation that plays on load (hero content).
@Directive({ selector: '[appEnter]' })
export class EnterDirective {
  readonly options = input<{ delay?: number; y?: number; scale?: number; duration?: number }>({}, { alias: 'appEnter' });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const reduced = prefersReducedMotion();
    queueMicrotask(() => {
      const { delay = 0, y = 0, scale = 1, duration = 0.6 } = this.options();
      const from = !reduced ? `translateY(${y}px) scale(${scale})` : 'none';
      el.style.opacity = '0';
      el.style.transform = from;
      animate(
        el,
        { opacity: 1, transform: 'translateY(0px) scale(1)' },
        { duration, delay, ease: [0.22, 1, 0.36, 1] },
      ).finished.then(() => {
        el.style.opacity = '';
        el.style.transform = '';
      });
    });
  }
}

// 3D tilt on hover; does nothing for reduced-motion users.
@Directive({
  selector: '[appTilt]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
  },
})
export class TiltDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly reduced = prefersReducedMotion();
  private controls?: { stop: () => void };

  private tiltTo(rx: number, ry: number) {
    this.controls?.stop();
    this.controls = animate(
      this.el,
      { transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)` },
      { type: 'spring', stiffness: 200, damping: 20 },
    );
  }

  protected onMove(e: PointerEvent) {
    if (this.reduced) return;
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    this.tiltTo(-y * 16, x * 16);
  }

  protected onLeave() {
    if (!this.reduced) this.tiltTo(0, 0);
  }
}
