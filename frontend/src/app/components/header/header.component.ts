import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mtgjson = 'https://mtgjson.com';

  constructor() { }

  ngOnInit(): void {
  }

  public openInNew(url: string): void {
    window.open(url, '_blank')
  }
}
