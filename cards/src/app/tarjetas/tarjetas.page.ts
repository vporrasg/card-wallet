import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from './cards.service'
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss'],
})
export class TarjetasPage implements OnInit {

  cards = []

  constructor(
    private cardService: CardsService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cards = await this.cardService.getCards()
  }

  async ionViewWillEnter() {
    this.cards = await this.cardService.getCards();
  }

  addNewCard() {
    this.router.navigate(['/new-card'])
  }

}
