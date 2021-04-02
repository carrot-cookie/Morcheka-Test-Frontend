import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Profile} from '../../../../entities/profile';
import {ProfileService} from '../../../services/profile.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-edit-credentials',
  templateUrl: './edit-credentials.component.html',
  styleUrls: ['./edit-credentials.component.css']
})
export class EditCredentialsComponent implements OnInit {

  @ViewChild('content') content: any;
  @Output() sent: Subject<void> = new Subject<void>();
  @Input() profile: Profile;

  editCredsForm: FormGroup;

  constructor(private profileService: ProfileService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.editCredsForm = new FormGroup({
      login: new FormControl(this.profile.login),
      password: new FormControl()
    });
  }

  public submitCreds(): void {
    this.profileService.editCreds({id: this.profile.id, login: this.editCredsForm.value.login,
      rawPassword: this.editCredsForm.value.password});
    this.sent.next();
  }

  public open(): void {
    this.modalService.open(this.content);
  }

  public close(): void {
    this.modalService.dismissAll();
  }

}
