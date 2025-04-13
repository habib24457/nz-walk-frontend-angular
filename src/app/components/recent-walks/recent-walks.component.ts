import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recent-walks',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './recent-walks.component.html',
  styleUrls: ['./recent-walks.component.css'],
})
export class RecentWalksComponent implements OnInit {
  walks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchWalks();
  }

  fetchWalks() {
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.walks = data;
        console.log('Walks fetched:', this.walks);
      },
      error: (error) => {
        console.error('Error fetching walks:', error);
      },
    });
  }
}
