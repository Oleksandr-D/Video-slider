import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  modalToggle() {
    this.isOpen = !this.isOpen
    console.log('Works ==>', this.isOpen);
    
  }

}