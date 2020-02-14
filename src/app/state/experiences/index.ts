import * as fromRoot from '..';
import { ExperiencesState } from './experiences.reducers';

export interface State extends fromRoot.State {
  experiences: ExperiencesState;
}
