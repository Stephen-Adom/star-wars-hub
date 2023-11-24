import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperContainer, register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: SwiperContainer

  ngAfterViewInit(): void {
    const swiperParams = {
      slidesPerView: 1,
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      centerSlides: true,
      centeredSlidesBounds: true,
      on: {
        init() {
          // ...
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(this.swiperContainer, swiperParams);

    // and now initialize it
    this.swiperContainer.initialize();
  }
}
