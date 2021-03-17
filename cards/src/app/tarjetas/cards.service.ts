import { Injectable } from '@angular/core';
import { Card } from './card-detail/card.model';

import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private data = this.storage.get("cards");
  private cards: Card[] = [];
  constructor(
    private storage: Storage

  ) {
  }

  async getCards() {
    let cardsTemp = await this.storage.get('cards');
    if (cardsTemp == null) {
      cardsTemp = []
    }

    this.cards = cardsTemp;
    return [...this.cards]
  }

  getCard(cardId: string) {
    return {
      ...this.cards.find(card => {
        return card.id === cardId
      })
    }
  }

  generateRandomID() {
    const characters = '0123456789';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result1;
  }

  async addCard(name: string, number: string, date: string, propietary: string, iban: string, cvc: string, type: string, color: string) {
    let cardsTemp = await this.storage.get('cards');
    if (cardsTemp == null) {
      cardsTemp = []
    }
    let id = this.generateRandomID();
    cardsTemp.push({
      name,
      number,
      date,
      propietary,
      iban,
      cvc,
      type,
      color,
      id
    });
    this.storage.set('cards', cardsTemp);
  }

  async deleteCard(cardId: string) {
    let cardsTemp = await this.storage.get('cards');
    cardsTemp = cardsTemp.filter(card => {
      return card.id !== cardId
    })
    this.storage.set('cards', cardsTemp);
  }
}