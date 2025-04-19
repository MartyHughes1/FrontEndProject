import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonRadio, IonRadioGroup, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonButton } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-genre',
  templateUrl: './genre.page.html',
  styleUrls: ['./genre.page.scss'],
  standalone: true,
  imports: [IonRadio, IonRadioGroup, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonButton]
})
export class GenrePage implements OnInit {
  genre: string = "";

  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {}

  // Save the genre choice when the button is clicked
  async onButtonClick() {
    await this.storage.create();
    await this.storage.set('genre', this.genre); // Save the selected genre
    this.router.navigateByUrl('/home'); // Navigate back to the HomePage
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.genre = await this.storage.get('genre'); // Retrieve the selected genre from storage
  }
}