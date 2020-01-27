import * as fromRoot from '../../state';
import { ServicesState } from './services.reducers';

export interface State extends fromRoot.State {
  services: ServicesState;
}
