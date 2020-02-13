import { trigger, transition, style, animate } from '@angular/animations';

export const routeFadeInAnimation =
  trigger('routeFadeIn', [
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
]);

export const slideInOutAnimation = trigger('slideInOut', [
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('0.15s', style({ transform: 'translateX(-100%)' }))
  ]),
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('0.25s')
  ]),
]);

export const fadeInStaggerAnimation = trigger('fadeInStagger', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-8px)' }),
    animate('0.3s', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
  ])
]);