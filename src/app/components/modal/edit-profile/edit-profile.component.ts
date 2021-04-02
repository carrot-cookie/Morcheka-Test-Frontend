import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../../entities/profile';
import {EditCredentialsComponent} from '../edit-credentials/edit-credentials.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('editCreds') editCreds: EditCredentialsComponent;
  @ViewChild('content') content: any;
  @Output() sent: Subject<void> = new Subject<void>();
  @Input() profile: Profile;
  editInfoForm: FormGroup;

  constructor(private profileService: ProfileService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.editInfoForm = new FormGroup({
      name: new FormControl(this.profile.name),
      lastName: new FormControl(this.profile.lastName),
      dateOfBirth: new FormControl(this.profile.dateOfBirth),
      email: new FormControl(this.profile.email, Validators.email)
    });
  }

  public submitInfo(): void {
    const value = this.editInfoForm.value;
    this.profileService.editProfile({id: this.profile.id, name: value.name, lastName: value.lastName, dateOfBirth: value.dateOfBirth,
      email: value.email});
    this.sent.next();
  }

  public open(): void {
    this.modalService.open(this.content);
  }

  openCredentials(): void {
    this.editCreds.open();
  }

  public close(): void {
    this.modalService.dismissAll();
  }

}
