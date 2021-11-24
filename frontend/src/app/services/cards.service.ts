import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private baseUrl = '/api/cards/';

  constructor(
    private http: HttpClient,
  ) { }

  public fixCard(card: Card): Card {
    if (!card.availability.includes('[]')) {
      card.availability = card.availability.substring(2, card.availability.length - 2);
    }
    if (!card.colors.includes('[]')) {
      card.colors = card.colors.substring(2, card.colors.length - 2);
    }
    if (!card.finishes.includes('[]')) {
      card.finishes = card.finishes.substring(2, card.finishes.length - 2);
    }
    if (!card.keywords.includes('[]')) {
      card.keywords = card.keywords.substring(2, card.keywords.length - 2);
    }
    if (!card.subtypes.includes('[]')) {
      card.subtypes = card.subtypes.substring(2, card.subtypes.length - 2);
    }
    if (!card.supertypes.includes('[]')) {
      card.supertypes = card.supertypes.substring(2, card.supertypes.length - 2);
    }
    if (!card.types.includes('[]')) {
      card.types = card.types.substring(2, card.types.length - 2);
    }
    if (card.type.includes('�')) {
      while (card.type.includes('�')) {
        card.type = card.type.replace('�', '-');
      }
    }

    return card;
  }

  public getAllCards(page: number, pageSize: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrl}`, { params: { page, pageSize }});
  }

  public getCardById(id: string | null): Observable<Card> {
    return this.http.get<Card>(`${this.baseUrl}id/${id}`).pipe(
      tap((card: Card) => {
        return this.fixCard(card);
      })
    );
  }

  public getCardByMultiverseIdSubstring(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.baseUrl}multiverseId/${id}`);
  }

  public getCardByArtistSubstring(str: string | null): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrl}artist/${str}`);
  }

  public getCardByNameSubstring(str: string | null): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrl}name/${str}`);
  }
}
