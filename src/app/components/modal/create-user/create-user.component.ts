import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../services/profile.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Output() sent: Subject<void> = new Subject<void>();
  @ViewChild('content') content: any;
  createForm: FormGroup;

  constructor(private profileService: ProfileService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      lastName: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl()
    });
  }

  public submitInfo(): void {
    const value = this.createForm.value;
    this.profileService.createProfile({login: value.login, rawPassword: value.password, name: value.name, lastName: value.lastName,
    dateOfBirth: value.dateOfBirth, email: value.email});
    this.sent.next();
  }

  public open(): void {
    this.modalService.open(this.content);
  }

  public close(): void {
    this.modalService.dismissAll();
  }

}
