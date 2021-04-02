import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Profile} from '../../../entities/profile';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {Subject} from 'rxjs';
import {EditProfileComponent} from '../modal/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @ViewChild('editModal') editModal: EditProfileComponent;
  @Input() profile: Profile;
  @Output() update: Subject<void> = new Subject<void>();
  public showButton = false;

  constructor(private modalService: NgbModal, private profileService: ProfileService) {
  }

  ngOnInit(): void {
  }

  public openModal(): void {
    this.editModal.open();
  }

  infoUpdated(): void {
    this.update.next();
  }


}
