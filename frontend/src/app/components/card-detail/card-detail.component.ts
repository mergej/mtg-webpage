import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  multiverseId: string = "";
  imageUrl: string = "";
  card?: Card;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private service: CardsService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.service.getCardById(id).subscribe(
      (card: Card) => {
        this.card = card;
        this.multiverseId = card.multiverseId;
        this.imageUrl = this.getImageUrl(card.multiverseId);
    });
  }

  public getImageUrl(multiverseId: string): string {
    if (multiverseId === "") {
      // Deckmaster is uses as Placeholder for Cards with not image
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card`;
    }
    return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseId}&type=card`;
  }

  public goBack(): void {
    this.location.back();
  }

  public redirectTo(uri: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate([uri]));
  }
}
