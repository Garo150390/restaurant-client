import { Component, Input, OnInit } from '@angular/core';

import { ImageModel} from '../../../core/models';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Input()
  public image: ImageModel;

  constructor() {
  }

  ngOnInit() {
  }

}
