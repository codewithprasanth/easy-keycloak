import { Observable } from 'rxjs';

export interface CanMoveToOtherPage {
  canMoveToOtherPage(): Promise<boolean> | Observable<boolean> | boolean;
}
