import * as fromRoot from '..';
import { ProjectsState } from './projects.reducers';

export interface State extends fromRoot.State {
  projects: ProjectsState;
}
