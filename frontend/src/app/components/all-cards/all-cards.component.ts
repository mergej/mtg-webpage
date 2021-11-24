import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent implements OnInit {

  index = 0;
  length = 10000;
  pageSize = 50;
  isFiltered = true;
  cards?: Card[];

  constructor(
    private router: Router,
    private service: CardsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has("name")) {
      const name = this.route.snapshot.queryParamMap.get("name");
      this.service.getCardByNameSubstring(name).subscribe(
        (cards: Card[]) => {
          this.cards = cards;
      });
    }
    else if (this.route.snapshot.queryParamMap.has("artist")) {
      const artist = this.route.snapshot.queryParamMap.get("artist");
      this.service.getCardByArtistSubstring(artist).subscribe(
        (cards: Card[]) => {
          this.cards = cards;
      });
    }
    else {
      this.isFiltered = false;
      this.service.getAllCards(1, this.pageSize).subscribe(
        (cards: Card[]) => {
          this.cards = cards;
      });
    }
  }

  public onPageChange(event: PageEvent): void {
    this.index = event.pageIndex;
    window.scrollTo(0, 0);
    this.service.getAllCards(event.pageIndex + 1, event.pageSize).subscribe(
      (cards: Card[]) => {
        this.cards = cards;
    });
  }

  public getImageUrl(multiverseId: string): string {
    if (multiverseId === "") {
      // Deckmaster is uses as Placeholder for Cards with not image
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card`;
    }
    return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseId}&type=card`;
  }

  public goToCardDetail(id: string): void {
    this.redirectTo(`/cards/${id}`);
  }

  private redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate([uri]));
  }
}
