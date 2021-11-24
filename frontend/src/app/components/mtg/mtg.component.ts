import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-mtg',
  templateUrl: './mtg.component.html',
  styleUrls: ['./mtg.component.css']
})
export class MtgComponent implements OnInit {

  isArtist = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Card[]>;

  constructor(
    private router: Router,
    private service: CardsService,
  ) { }

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe((value: string) => {
      this.filteredOptions = this._filter(value);
    });
  }

  public getImageUrl(multiverseId: string): string {
    if (multiverseId === "") {
      // Deckmaster is uses as Placeholder for Cards with not image
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card`;
    }
    return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseId}&type=card`;
  }

  public containsNumber(value: string): boolean {
    return /\d/.test(value);
  }

  public search(): void {
    let param: any = {}
    const value = this.myControl.value;

    if (this.myControl.untouched || value == '') {
      this.router.navigate(['/cards']);
    }
    else {
      if (this.isArtist) {
        param['artist'] = value;
      } else {
        param['name'] = value;
      }
      this.redirectTo('/cards', param);
    }
  }

  private _filter(value: string): Observable<Card[]> {
    const filterValue = value.toLowerCase();
    if (this.isArtist) {
      return this.service.getCardByArtistSubstring(filterValue);
    }
    else {
      return this.service.getCardByNameSubstring(filterValue);
    }
  }

  private redirectTo(uri: string,  params: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri], { queryParams: params })
    });
  }
}
