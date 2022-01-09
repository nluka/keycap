import type AlertId from './AlertId';
import type Page from './Page';

export default interface IAlert {
  id: AlertId;
  pagesToShowOn: Page[];
}
