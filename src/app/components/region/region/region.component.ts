import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
})
export class RegionComponent {
  regions: any[] = [];
  showDialog: boolean = false;
  isEditMode: boolean = false;
  regionForm: FormGroup;
  selectedRegion: any = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.regionForm = this.fb.group({
      name: [''],
      code: [''],
      regionImageUrl: [''],
    });
  }

  ngOnInit() {
    this.fetchRegions();
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

  addRegion() {
    this.isEditMode = false;
    this.showDialog = true;
    this.regionForm.reset();
  }

  saveRegion() {
    const apiUrl =
      'https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Regions';
    const newRegion = this.regionForm.value;

    this.http.post(apiUrl, newRegion).subscribe({
      next: (response) => {
        console.log('Region saved successfully:', response);
        this.regions.push(newRegion);
        this.showDialog = false;
        this.regionForm.reset();
      },
      error: (error) => {
        console.error('Error saving region:', error);
      },
    });
  }

  updateRegion(region: any) {
    this.isEditMode = true;
    this.showDialog = true;
    this.selectedRegion = region;
    this.regionForm.patchValue(region);
  }

  saveUpdatedRegion() {
    const apiUrl = `https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Regions/${this.selectedRegion.id}`;
    const updatedRegion = this.regionForm.value;

    this.http.put(apiUrl, updatedRegion).subscribe({
      next: (response) => {
        console.log('Region updated successfully:', response);
        const index = this.regions.findIndex(
          (r) => r.id === this.selectedRegion.id
        );
        if (index !== -1) {
          this.regions[index] = { ...this.selectedRegion, ...updatedRegion };
        }
        this.showDialog = false;
        this.regionForm.reset();
      },
      error: (error) => {
        console.error('Error updating region:', error);
      },
    });
  }

  deleteRegion(region: any) {
    const apiUrl = `https://new-zone-api-brhpfkd2emavh2ep.germanywestcentral-01.azurewebsites.net/api/Regions/${region.id}`;

    if (
      confirm(`Are you sure you want to delete the region: ${region.name}?`)
    ) {
      this.http.delete(apiUrl).subscribe({
        next: () => {
          console.log(`Region with ID ${region.id} deleted successfully.`);
          this.regions = this.regions.filter((r) => r.id !== region.id);
        },
        error: (error) => {
          console.error('Error deleting region:', error);
        },
      });
    }
  }

  closeDialog() {
    this.showDialog = false;
    this.regionForm.reset();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
