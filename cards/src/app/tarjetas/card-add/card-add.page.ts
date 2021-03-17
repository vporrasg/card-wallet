import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.page.html',
  styleUrls: ['./card-add.page.scss'],
})
export class CardAddPage implements OnInit {

  constructor(
    private cardService: CardsService,
    private router: Router,


  ) { }

  ngOnInit() {
  }

 
  async saveNewCard(name,number,date,propietary,iban,cvc,type,color) {
    await this.cardService.addCard(name.value, number.value, date.value, propietary.value, iban.value, cvc.value, type.value, color.value);
    this.router.navigate(['/tarjetas'])
  }

}
