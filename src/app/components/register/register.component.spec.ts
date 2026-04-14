import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with all fields', () => {
    expect(component.registerForm.get('id')).toBeTruthy();
    expect(component.registerForm.get('countryId')).toBeTruthy();
    expect(component.registerForm.get('cityId')).toBeTruthy();
    expect(component.registerForm.get('registrationRefNo')).toBeTruthy();
    expect(component.registerForm.get('companyName')).toBeTruthy();
    expect(component.registerForm.get('companyAddress')).toBeTruthy();
    expect(component.registerForm.get('landlineNumber')).toBeTruthy();
    expect(component.registerForm.get('website')).toBeTruthy();
    expect(component.registerForm.get('fax')).toBeTruthy();
    expect(component.registerForm.get('companyEmail')).toBeTruthy();
    expect(component.registerForm.get('licenseNumber')).toBeTruthy();
    expect(component.registerForm.get('contactPersonName')).toBeTruthy();
    expect(component.registerForm.get('designation')).toBeTruthy();
    expect(component.registerForm.get('mobileNumber')).toBeTruthy();
    expect(component.registerForm.get('allowedSubusers')).toBeTruthy();
    expect(component.registerForm.get('registrationStatus')).toBeTruthy();
    expect(component.registerForm.get('isActive')).toBeTruthy();
    expect(component.registerForm.get('createdOn')).toBeTruthy();
    expect(component.registerForm.get('updatedOn')).toBeTruthy();
  });

  it('should mark form as invalid when required fields are empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const emailControl = component.registerForm.get('companyEmail');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should reset form to initial state', () => {
    component.registerForm.patchValue({
      companyName: 'Test Company',
      companyEmail: 'test@example.com'
    });

    component.resetForm();

    expect(component.registerForm.get('companyName')?.value).toBeNull();
    expect(component.registerForm.get('registrationStatus')?.value).toBe('PENDING');
    expect(component.registerForm.get('isActive')?.value).toBe(true);
  });
});
