import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../../entities/pageable';
import {Profile} from '../../entities/profile';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {EditProfileModel} from '../../entities/edit-profile-model';
import {EditCredentialsModel} from '../../entities/edit-credentials-model';
import {CreateProfileModel} from '../../entities/create-profile-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private pageSize = 5;

  constructor(private httpClient: HttpClient) { }

  public getAllProfiles(pageNumber: number): Observable<Pageable<Profile>> {
    return this.httpClient.get<Pageable<Profile>>(`${environment.backendUrl}/profile/all?page=${pageNumber}&pageSize=${this.pageSize}`);
  }

  public createProfile(model: CreateProfileModel): void {
    this.httpClient.post(`${environment.backendUrl}/profile/new`, model).subscribe();
  }

  public editProfile(model: EditProfileModel): void {
    this.httpClient.post(`${environment.backendUrl}/profile/edit`, model).subscribe();
  }

  public editCreds(model: EditCredentialsModel): void {
    this.httpClient.post(`${environment.backendUrl}/profile/editCredentials`, model).subscribe();
  }
}
