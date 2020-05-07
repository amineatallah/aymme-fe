import * as fromRoot from '..';
import { SpecificationsState } from './specifications.reducers';

export interface State extends fromRoot.State {
  specifications: SpecificationsState;
}
