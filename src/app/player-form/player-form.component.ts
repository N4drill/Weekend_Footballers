import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Positions } from '../../constants/positions';
import { User } from '../../model/user.model';
import { AuthService } from '../core/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constants, Defaults } from 'src/constants/constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {

  firstStepGroup: FormGroup;

  avaiblePositions: string[];

  imageChangedEvent: any = '';
  croppedImage: any = '../../assets/avatar_placeholder.png';

  userAvatarFile: File = null;
  userAvatarPath = Defaults.PHOTO_PATH;
  currentUserUID: string;

  checked = false;

  playersCollection: AngularFirestoreCollection<User>;
  uploadTask: AngularFireUploadTask;
  uploadPercentage: Observable<number>;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.avaiblePositions = Positions;

    this.playersCollection = this.firestore.collection<User>(`${Constants.FirestoreColletions.USERS}`);

    this.authService.user$.pipe(take(1))
      .subscribe(
        (user => {
          this.currentUserUID = user.uid;
        })
      );

    this.firstStepGroup = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[A-Z][a-z,ą,ę,ć,ń,ó,ś,ł]*')
      ]],
      secondName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[A-Z][a-z,ą,ę,ć,ń,ó,ś,ł]*')
      ]],
      nickName: '',
      position: ['', [
        Validators.required,
      ]]
    });

  }
  //#endregion

  //#region Getters

  get firstName() {
    return this.firstStepGroup.get('firstName');
  }

  get secondName() {
    return this.firstStepGroup.get('secondName');
  }

  get nickName() {
    return this.firstStepGroup.get('nickName');
  }

  get position() {
    return this.firstStepGroup.get('position');
  }

  //#endregion

  completeForm() {
    this.uploadImage();
    this.addPlayer();
    this.router.navigate(['/']);
  }

  uploadImage() {
    if (this.userAvatarFile === null) {
      return;
    }
    // Upload task
    this.userAvatarPath = `${Constants.FireStorage.PHOTOS}${this.currentUserUID}`;
    this.uploadTask = this.storage.upload(this.userAvatarPath, this.userAvatarFile);
    this.uploadPercentage = this.uploadTask.percentageChanges();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.userAvatarFile = new File([event.file], `${this.currentUserUID}`, { type: event.file.type });
  }
  imageLoaded() {
    this.snackBar.open('Succesfully uploaded and image', 'Close', {
      duration: 800
    });
  }
  loadImageFailed() {
    this.snackBar.open('Failed to upload an image', 'Close', {
      duration: 1000
    });
  }

  addPlayer() {
    console.log('Adding player');
    this.playersCollection.doc(this.currentUserUID).set({
      isValid: true,
      uid: this.currentUserUID,
      name: this.firstName.value + ' ' + this.secondName.value,
      photoURL: this.userAvatarPath,
      position: this.position.value,
      pseudo: this.nickName.value,
      rating: 0
    } as User, { merge: true });
  }
}

