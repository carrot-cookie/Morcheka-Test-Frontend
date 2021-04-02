import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../../entities/profile';
import {Pageable} from '../../../entities/pageable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateUserComponent} from '../../components/modal/create-user/create-user.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('createUser') createModal: CreateUserComponent;
  public profiles: Profile[];
  pageable: EventEmitter<Pageable<Profile>> = new EventEmitter<Pageable<Profile>>();

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllProfiles();
  }

  public getAllProfiles(page: number = 0): void {
    this.profileService.getAllProfiles(page).subscribe(pageable => {
      this.pageable.emit(pageable);
    });
  }

  public onContentChanged(event: Profile[]): void {
    this.profiles = event;
  }

  public openCreateModal(): void {
    this.createModal.open();
  }

  public exit(): void {
    this.authService.exit();
  }

}
