import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeFadeInAnimation =
  trigger('routeAnimations', [
    transition('*<=>*', [

      style({ opacity: 0 }),

      animate('0.25s', style({ opacity: 1 }))
    ]),
  ]);

export const collapseExpandAnimation = trigger('collapseExpand', [

  transition(':enter', [
    style({ opacity: 0, height: 0, overflow: 'hidden' }),
    animate('0.2s', style({ opacity: 1, height: '*', }))
  ]),
  transition(':leave', [
    style({ opacity: 0, }),
    animate('0.1s', style({ height: 0, overflow: 'hidden' }))
  ])
])