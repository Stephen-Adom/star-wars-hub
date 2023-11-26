import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>
  constructor(
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(800),
      distinctUntilChanged(),
      map((event: Event) => {
        return (event.target as HTMLInputElement).value
      })
    ).subscribe(value => {
      console.log(value, 'value');
    })
  }

  viewCharacters() {
    this.router.navigate(['people/list'])
  }
}
