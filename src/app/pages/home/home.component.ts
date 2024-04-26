import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VimeoService } from '../../shared/services/vimeo/vimeo.service';
import VimeoPlayer from '@vimeo/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('vimeoFrame') vimeoFrame!: ElementRef;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>;

  public isOpen = false;
  public vimeoId: string | undefined;
  public slideIndex: number = 0;
  public slidesPerView: number = 4;

  constructor(private vimeoService: VimeoService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.loadRandomVideo();
    this.updateCarousel();
  }

  modalToggle() {
    this.isOpen = !this.isOpen
  }

  scrollLeft(): void {
    this.slideIndex = (this.slideIndex - 1 + 8) % 8;
    this.updateCarousel();
  }

  scrollRight(): void {
    this.slideIndex = (this.slideIndex + 1) % 8;
    this.updateCarousel();
  }

  updateCarousel(): void {
    const container = this.carouselContainer.nativeElement;
    const slides = container.children;
    if (slides.length > 0) {
      const slideWidth = slides[0].clientWidth + parseFloat(getComputedStyle(slides[0]).marginLeft)
      + parseFloat(getComputedStyle(slides[0]).marginRight);
      container.style.transform = `translateX(${-(this.slideIndex * slideWidth)}px)`;
    }
  }
  
  loadRandomVideo() {
    // Використання сервісу для отримання списку відео
    this.vimeoService.getVideos().subscribe(
      (data: any) => {
        // Перевірка, що відповідь має масив відео
        const videos = data.data;
        if (Array.isArray(videos) && videos.length > 0) {
          // Вибір випадкового відео
          const randomIndex = Math.floor(Math.random() * videos.length);
          const randomVideo = videos[randomIndex];
          this.vimeoId = randomVideo.uri.split('/').pop();

          // Встановлення isOpen у true після вибору випадкового відео
          this.isOpen = true;

          // Завантаження плеєра Vimeo після отримання ID відео
          this.loadVimeoPlayer();
        } else {
          console.error('No videos found in the response.');
        }
      },
      error => {
        console.error('Error fetching videos:', error);
      }
    );
  }


  loadVimeoPlayer() {
    
    const iframe = this.vimeoFrame.nativeElement as HTMLIFrameElement;

    // Встановлення src атрибуту для iframe з використанням ID відео
    iframe.src = `https://player.vimeo.com/video/${this.vimeoId}`;

    // Створення нового об'єкта Vimeo плеєра та встановлення налаштувань
    const id = this.vimeoId ? parseInt(this.vimeoId, 10) : undefined;
    const vimeoPlayer = new VimeoPlayer(iframe, {
      id: id,
      autoplay: true,
      loop: true
    });
  }

 
}


