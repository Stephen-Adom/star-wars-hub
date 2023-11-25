import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lister-page',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './lister-page.component.html',
  styleUrls: ['./lister-page.component.scss']
})
export class ListerPageComponent implements OnInit, OnDestroy {
  categoryList: any[] = [];
  routeSubscription = new Subscription();
  category!: string | null;
  tableHeader = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Height',
      value: 'height'
    },
    {
      label: 'Mass',
      value: 'mass'
    },
    {
      label: 'Hair Color',
      value: 'hair_color'
    },
    {
      label: 'Skin Color',
      value: 'skin_color'
    },
    {
      label: 'Eye Color',
      value: 'eye_color'
    },
    {
      label: 'Gender',
      value: 'gender'
    }
  ]

  data: any = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      gender: 'male'
    }
  ]

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(data => {
      this.category = data.get('category');
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
