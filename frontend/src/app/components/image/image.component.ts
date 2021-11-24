import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-spinner',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() img: String = "";
  @Input() imgContainerClass: String = "";

  loading: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onLoad() {
    this.loading = false;
  }
}
