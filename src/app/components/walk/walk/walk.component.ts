import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-walk',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.css'],
})
export class WalkComponent {
  walks: any[] = [];
  showDialog: boolean = false;
  isEditMode: boolean = false;
  walkForm: FormGroup;
  selectedWalk: any = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.walkForm = this.fb.group({
      name: [''],
      description: [''],
      walkImageUrl: [''],
    });
  }

  ngOnInit() {
    this.fetchWalks();
  }

  fetchWalks() {
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.walks = data;
        console.log('Walks:', this.walks);
      },
      error: (error) => {
        console.error('Error fetching walks:', error);
      },
    });
  }

  addWalk() {
    this.isEditMode = false;
    this.showDialog = true;
    this.walkForm.reset();
  }

  saveWalk() {
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks';
    const newWalk = this.walkForm.value;

    this.http.post(apiUrl, newWalk).subscribe({
      next: (response) => {
        console.log('Walk saved successfully:', response);
        this.walks.push(newWalk);
        this.showDialog = false;
        this.walkForm.reset();
      },
      error: (error) => {
        console.error('Error saving walk:', error);
      },
    });
  }

  updateWalk(walk: any) {
    this.isEditMode = true;
    this.showDialog = true;
    this.selectedWalk = walk;
    this.walkForm.patchValue(walk);
  }

  saveUpdatedWalk() {
    const apiUrl = `https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks/${this.selectedWalk.id}`;
    const updatedWalk = this.walkForm.value;

    this.http.put(apiUrl, updatedWalk).subscribe({
      next: (response) => {
        console.log('Walk updated successfully:', response);
        const index = this.walks.findIndex(
          (w) => w.id === this.selectedWalk.id
        );
        if (index !== -1) {
          this.walks[index] = { ...this.selectedWalk, ...updatedWalk };
        }
        this.showDialog = false;
        this.walkForm.reset();
      },
      error: (error) => {
        console.error('Error updating walk:', error);
      },
    });
  }

  deleteWalk(walk: any) {
    const apiUrl = `https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks/${walk.id}`;

    if (confirm(`Are you sure you want to delete the walk: ${walk.name}?`)) {
      this.http.delete(apiUrl).subscribe({
        next: () => {
          console.log(`Walk with ID ${walk.id} deleted successfully.`);
          this.walks = this.walks.filter((w) => w.id !== walk.id);
        },
        error: (error) => {
          console.error('Error deleting walk:', error);
        },
      });
    }
  }

  closeDialog() {
    this.showDialog = false;
    this.walkForm.reset();
  }
}
