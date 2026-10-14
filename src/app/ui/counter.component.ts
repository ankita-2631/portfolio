import { Component, DestroyRef, ElementRef, inject, input, signal } from '@angular/core';
import { animate, inView } from 'motion';
import { prefersReducedMotion } from './motion.directives';

@Component({
  selector: 'app-counter',
  template: `{{ n() }}{{ suffix() }}`,
})
export class CounterComponent {
  readonly to = input.required<number>();
  readonly suffix = input('');
  protected readonly n = signal(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    const reduced = prefersReducedMotion();
    queueMicrotask(() => {
      if (reduced) {
        this.n.set(this.to());
        return;
      }
      const stop = inView(el, () => {
        const controls = animate(0, this.to(), {
          duration: 1.6,
          ease: 'easeOut',
          onUpdate: (v) => this.n.set(Math.round(v)),
        });
        destroyRef.onDestroy(() => controls.stop());
      });
      destroyRef.onDestroy(stop);
    });
  }
}
