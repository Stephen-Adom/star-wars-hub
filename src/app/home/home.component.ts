import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { Router } from '@angular/router';

register();

type infoType = {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('swiperContainer') swiperContainer!: SwiperContainer

  infoOverview: infoType[] = [
    {
      image: 'assets/images/people.jpg',
      title: 'People',
      description: 'Explore an intriguing array of iconic personalities and characters that inhabit the vast Star Wars universe.'
    },
    {
      image: 'assets/images/planet.jpg',
      title: 'Planet',
      description: 'A celestial body, encompassing planets, large masses, and planetoids, adds depth and complexity to the expansive Star Wars Universe. Discover the rich tapestry of worlds, each with its own unique characteristics, landscapes, and significance within the overarching narrative of the Star Wars saga.'
    },
    {
      image: 'assets/images/species.jpg',
      title: 'Species',
      description: 'A Species in the Star Wars Universe represents a diverse array of sentient beings, each possessing its own distinctive characteristics, cultures, and histories. Delve into the fascinating world of Star Wars Species, where the richness of the galaxy unfolds through a myriad of unique individuals, contributing to the tapestry of this beloved universe.'
    },
    {
      image: 'assets/images/starship.jpg',
      title: 'Starship',
      description: 'A Starship, within the Star Wars Universe, is not merely a vessel; it\'s a singular mode of transport with the remarkable ability to traverse the vastness of space using hyperdrive technology. These extraordinary spacecraft are at the heart of intergalactic adventures, each possessing its own design, capabilities, and stories waiting to be explored. Embark on a journey to uncover the captivating tales woven into the fabric of Star Wars Starships, where the possibilities are as infinite as the galaxies they navigate.'
    },
    {
      image: 'assets/images/vehicles.jpg',
      title: 'Vehicles',
      description: 'In the Star Wars Universe, a Vehicle stands as a singular transport craft, distinct from its hyperdrive-enabled counterparts. While it lacks the ability to traverse hyperspace, it plays a crucial role in various planetary adventures. These Vehicles showcase diverse designs and functionalities, contributing to the dynamic and immersive world of Star Wars. Explore the unique charm and practicality of these ground-based transports, each with its own character and purpose within the galaxy far, far away.'
    },
  ]

  constructor(
    private router: Router
  ) { }

  viewDetails(info: infoType) {
    this.router.navigate([info.title.toLowerCase(), 'list'])
    console.log(info);
  }
}
