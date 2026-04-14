import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  // Sample data for dropdowns - replace with actual API calls
  countries = [
    { id: '1', name: 'United States' },
    { id: '2', name: 'United Kingdom' },
    { id: '3', name: 'Canada' },
    { id: '4', name: 'Australia' },
    { id: '5', name: 'Germany' }
  ];

  cities = [
    { id: '1', name: 'New York', countryId: '1' },
    { id: '2', name: 'London', countryId: '2' },
    { id: '3', name: 'Toronto', countryId: '3' },
    { id: '4', name: 'Sydney', countryId: '4' },
    { id: '5', name: 'Berlin', countryId: '5' },
    { id: '6', name: 'Los Angeles', countryId: '1' },
    { id: '7', name: 'Manchester', countryId: '2' },
    { id: '8', name: 'Vancouver', countryId: '3' }
  ];

  filteredCities: any[] = [];

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      countryId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      registrationRefNo: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      landlineNumber: ['', [Validators.pattern(/^[0-9\-\+\(\)\s]+$/)]],
      website: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)]],
      fax: ['', [Validators.pattern(/^[0-9\-\+\(\)\s]+$/)]],
      companyEmail: ['', [Validators.required, Validators.email]],
      licenseNumber: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\(\)\s]{10,}$/)]],
      allowedSubusers: ['', [Validators.required, Validators.min(0)]],
      registrationStatus: ['PENDING', [Validators.required]],
      isActive: [true, [Validators.required]]
    });

    // Watch for country changes to filter cities
    this.registerForm.get('countryId')?.valueChanges.subscribe(countryId => {
      this.onCountryChange(countryId);
    });
  }

  onCountryChange(countryId: string): void {
    if (countryId) {
      this.filteredCities = this.cities.filter(city => city.countryId === countryId);
      // Reset city selection when country changes
      this.registerForm.patchValue({ cityId: '' });
    } else {
      this.filteredCities = [];
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form Data JSON:', JSON.stringify(formData, null, 2));
      // Call API service to submit the form
      this.registrationService.submitRegistration(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Handle success, e.g., show message, navigate, etc.
        },
        error: (error) => {
          console.error('Registration failed:', error);
          // Handle error, e.g., show error message
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm(): void {
    this.registerForm.reset({
      registrationStatus: 'PENDING',
      isActive: true
    });
    this.filteredCities = [];
  }

  get countryId() {
    return this.registerForm.get('countryId');
  }

  get cityId() {
    return this.registerForm.get('cityId');
  }

  get registrationRefNo() {
    return this.registerForm.get('registrationRefNo');
  }

  get companyName() {
    return this.registerForm.get('companyName');
  }

  get companyAddress() {
    return this.registerForm.get('companyAddress');
  }

  get landlineNumber() {
    return this.registerForm.get('landlineNumber');
  }

  get website() {
    return this.registerForm.get('website');
  }

  get fax() {
    return this.registerForm.get('fax');
  }

  get companyEmail() {
    return this.registerForm.get('companyEmail');
  }

  get licenseNumber() {
    return this.registerForm.get('licenseNumber');
  }

  get contactPersonName() {
    return this.registerForm.get('contactPersonName');
  }

  get designation() {
    return this.registerForm.get('designation');
  }

  get mobileNumber() {
    return this.registerForm.get('mobileNumber');
  }

  get allowedSubusers() {
    return this.registerForm.get('allowedSubusers');
  }

  get registrationStatus() {
    return this.registerForm.get('registrationStatus');
  }

  get isActive() {
    return this.registerForm.get('isActive');
  }
}