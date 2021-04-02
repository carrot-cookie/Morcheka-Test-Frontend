import {FormControl} from '@angular/forms';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export interface CreateProfileModel {
  login: string;
  rawPassword: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
}
