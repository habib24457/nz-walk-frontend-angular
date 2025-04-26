import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../sharedModule/shared.module';

@Component({
  selector: 'app-recent-walks',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SharedModule],
  templateUrl: './recent-walks.component.html',
  styleUrls: ['./recent-walks.component.css'],
})
export class RecentWalksComponent implements OnInit {
  walks: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchWalks();
  }

  fetchWalks() {
    this;
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.walks = data;
        console.log('Walksksksk:', this.walks);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching regions:', error);
      },
    });
  }
}
