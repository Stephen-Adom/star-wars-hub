import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-search-result-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './search-result-dialog.component.html',
  styleUrls: ['./search-result-dialog.component.scss']
})
export class SearchResultDialogComponent {
  visible = true;
}
