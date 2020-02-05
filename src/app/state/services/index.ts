import * as fromRoot from '..';
import { ServicesState } from './services.reducers';

export interface State extends fromRoot.State {
  services: ServicesState;
}
