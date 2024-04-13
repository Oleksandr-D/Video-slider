import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var Vimeo: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public isOpen = false;

  @ViewChild('vimeoFrame') vimeoFrame!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadVimeoPlayer();
  }

  modalToggle() {
    this.isOpen = !this.isOpen
  }

  loadVimeoPlayer() {
    const iframe = this.vimeoFrame.nativeElement.querySelector('iframe') as HTMLIFrameElement;
    const vimeoId = this.vimeoFrame.nativeElement.getAttribute('data-vimeo-id');
    if (vimeoId) {
      const player = new Vimeo.Player(iframe, {
        id: vimeoId,
        autoplay: true,
        loop: true
      });
    }
  }
}


