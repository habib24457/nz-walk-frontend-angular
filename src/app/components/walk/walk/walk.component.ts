import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '../../sharedModule/shared.module';

@Component({
  selector: 'app-walk',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.css'],
})
export class WalkComponent {
  walks: any[] = [];
  regions: any[] = [];
  difficulties: any[] = [];
  showDialog: boolean = false;
  isEditMode: boolean = false;
  walkForm: FormGroup;
  selectedWalk: any = null;
  loading: boolean = true;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.walkForm = this.fb.group({
      name: '',
      description: '',
      lengthInKm: 0,
      walkImageUrl: '',
      difficultyId: '',
      regionId: '',
    });
  }

  ngOnInit() {
    this.fetchWalks();
    this.fetchRegions();
    this.fetchDifficulties();
  }

  fetchWalks() {
    this.loading = true;
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.walks = data;
        console.log('Walks:', this.walks);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching walks:', error);
      },
    });
  }

  fetchRegions() {
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Regions';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.regions = data;
        console.log('Regions:', this.regions);
      },
      error: (error) => {
        console.error('Error fetching regions:', error);
      },
    });
  }

  fetchDifficulties() {
    this.difficulties = [
      { id: 'd37fa264-31a4-4156-b010-13b52c4f6ee9', name: 'Easy' },
      { id: '30711259-7265-4794-af0d-be1057745b46', name: 'Medium' },
      { id: 'bd165a93-cc41-4d45-852a-26c6049b0411', name: 'Hard' },
    ];
    console.log('Difficulties:', this.difficulties);
  }

  addWalk() {
    this.isEditMode = false;
    this.showDialog = true;
    this.walkForm.reset();
  }

  saveWalk() {
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks';

    const newWalk = {
      name: this.walkForm.value.name,
      description: this.walkForm.value.description,
      lengthInKm: this.walkForm.value.lengthInKm,
      walkImageUrl: this.walkForm.value.walkImageUrl,
      regionId: this.walkForm.value.regionId,
      difficultyId:
        this.walkForm.value.difficultyId ||
        'd37fa264-31a4-4156-b010-13b52c4f6ee9',
    };

    this.http.post(apiUrl, newWalk).subscribe({
      next: (response) => {
        console.log('Walk saved successfully:', response);
        this.walks.push(response);
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

    this.walkForm.patchValue({
      name: walk.name,
      description: walk.description,
      lengthInKm: walk.lengthInKm,
      walkImageUrl: walk.walkImageUrl,
      regionId: walk.region?.id || '',
      difficultyId: walk.difficulty?.id || '',
    });

    console.log('Updating walk:', this.walkForm.value);
  }

  saveUpdatedWalk() {
    const apiUrl = `https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Walks/${this.selectedWalk.id}`;

    console.log('Saving updated walk:', this.walkForm.value);
    const updatedWalk = {
      name: this.walkForm.value.name,
      description: this.walkForm.value.description,
      lengthInKm: this.walkForm.value.lengthInKm,
      walkImageUrl: this.walkForm.value.walkImageUrl,
      regionId: this.walkForm.value.regionId,
      difficultyId: this.walkForm.value.difficultyId,
    };

    this.http.put(apiUrl, updatedWalk).subscribe({
      next: (response) => {
        console.log('Walk updated successfully:', response);
        const index = this.walks.findIndex(
          (w) => w.id === this.selectedWalk.id
        );
        if (index !== -1) {
          this.walks[index] = { ...this.selectedWalk, ...updatedWalk };
        }
        this.fetchWalks();
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
