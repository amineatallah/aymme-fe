import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('*<=>*', [

        // css styles at start of transition
        style({ opacity: 0 }),
  
        // animation and styles at end of transition
        animate('0.25s', style({ opacity: 1 }))
      ]),
  ]);