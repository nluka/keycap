import type IStatePractice from './IStatePractice';
import type IStateUser from './IStateUser';
import type Page from './Page';

export default interface IStateApp {
  user: IStateUser;
  practice: IStatePractice;
  alerts: JSX.Element[];
  page: Page;
}
