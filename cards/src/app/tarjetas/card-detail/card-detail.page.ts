import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../cards.service';
import { Card } from './card.model';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

  card: Card;

  color = "";
  number = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardsService,
    private router: Router,
    private alertCtrl: AlertController,
    private socialSharing: SocialSharing
  ) {
  }

  defineColor() {
    switch (this.card.color) {
      case 'rojo':
        this.color = "#EA2027";
        break;
      case 'azul':
        this.color = "#1e3799";
        break;
      case 'negro':
        this.color = "#1e272e";
        break;
      case 'amarillo':
        this.color = "#ffd32a";
        break;
      case 'blanco':
        this.color = "#dfe4ea";
        break;
      default:
        this.color = "#EA2027";
    }
  }

  definenumber(){
    let a = this.card.number.substring(0,4);
    let b = this.card.number.substring(4,8);
    let c = this.card.number.substring(8,12);
    let d = this.card.number.substring(12,16);
    this.number = a+" "+b+" "+c+" "+d;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('cardId');
      this.card = this.cardService.getCard(recipeId);
      console.log(this.card);
      this.defineColor();
      this.definenumber();
    })
  }

  async deleteCard() {
    const alertElement = await this.alertCtrl.create({
      header: 'Desea eliminar la tarjeta?',
      message: "cambio irreversible",
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel'
        },
        {
          text: 'eliminar',
          handler: async () => {
            await this.cardService.deleteCard(this.card.id)
            this.router.navigate(['/tarjetas'])
          }
        }
      ]
    })
    await alertElement.present();
  }

  share() {
    this.socialSharing.share(
      "Número de cuenta: " + this.card.number + ", Número de cuenta IBAN: " + this.card.iban
    )
  }
}
