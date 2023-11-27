import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { Router } from '@angular/router';

register();

type infoType = {
  image: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;

  infoOverview: infoType[] = [
    {
      image: 'assets/images/people.jpg',
      title: 'People',
      description:
        'Explore an intriguing array of iconic personalities and characters that inhabit the vast Star Wars universe.',
    },
    {
      image: 'assets/images/planets.jpg',
      title: 'Planets',
      description:
        'A celestial body, encompassing planets, large masses, and planetoids, adds depth and complexity to the expansive Star Wars Universe. Discover the rich tapestry of worlds, each with its own unique characteristics, landscapes, and significance within the overarching narrative of the Star Wars saga.',
    },
    {
      image: 'assets/images/species.jpg',
      title: 'Species',
      description:
        'A Species in the Star Wars Universe represents a diverse array of sentient beings, each possessing its own distinctive characteristics, cultures, and histories. Delve into the fascinating world of Star Wars Species, where the richness of the galaxy unfolds through a myriad of unique individuals, contributing to the tapestry of this beloved universe.',
    },
    {
      image: 'assets/images/starships.jpg',
      title: 'Starships',
      description:
        "A Starship, within the Star Wars Universe, is not merely a vessel; it's a singular mode of transport with the remarkable ability to traverse the vastness of space using hyperdrive technology. These extraordinary spacecraft are at the heart of intergalactic adventures, each possessing its own design, capabilities, and stories waiting to be explored.",
    },
    {
      image: 'assets/images/vehicles.jpg',
      title: 'Vehicles',
      description:
        'In the Star Wars Universe, a Vehicle stands as a singular transport craft, distinct from its hyperdrive-enabled counterparts. While it lacks the ability to traverse hyperspace, it plays a crucial role in various planetary adventures. Explore the unique charm and practicality of these ground-based transports, each with its own character and purpose within the galaxy far, far away.',
    },
    {
      image: 'assets/images/films.jpg',
      title: 'Films',
      description:
        "A Star Wars film is not just a cinematic experience; it's a journey into an epic universe filled with timeless stories, iconic characters, and boundless imagination. Dive into the magic of a single Star Wars film, where every frame is a brushstroke painting a larger-than-life canvas of adventure, heroism, and the eternal battle between the forces of light and darkness.",
    },
  ];

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // swiper parameters
    const swiperParams = {
      slidesPerView: 3,
      spaceBetween: 15,
      speed: 500,
      loop: true,
      cssMode: true,
      centeredSlides: true,
      navigation: true,
      pagination: true,
      class: 'mySwiper',
      breakpoints: {
        350: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      on: {
        init() {
          // ...
        },
      },
    };
    Object.assign(this.swiperContainer.nativeElement, swiperParams);
    this.swiperContainer.nativeElement.initialize();
  }

  viewDetails(info: infoType) {
    this.router.navigate([info.title.toLowerCase(), 'list']);
  }
}
