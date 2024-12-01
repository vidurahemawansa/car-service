import { Component, OnDestroy } from '@angular/core';
import { SharedFormModule } from '../../shared-form.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [SharedFormModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements OnDestroy {
  addVehicleForm: FormGroup;
  vehicleTypes = [
    'Car',
    'Van',
    'Lorry',
    'Bus',
    'Cab',
    'Jeep',
    'Three Wheeler',
    'Bike',
  ];
  jobTypes = ['Repair', 'Full Service', 'Body Wash'];
  jobOwners = ['John', 'Nuwan', 'Vidura'];

  isSubmitting: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private message: NzMessageService) {
    this.addVehicleForm = this.fb.group({
      vehicleType: [null, [Validators.required]],
      licensePlate: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?:[A-Z]{1,3}|[0-9]{1,3})\s?-?\s?\d{4}$/),
        ],
      ],
      jobType: [null, [Validators.required]],
      jobOwner: [null, [Validators.required]],
      isJobDone: [false],
    });

    this.addVehicleForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isSubmitting) {
          this.isSubmitting = false;
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    if (this.addVehicleForm.valid) {
      console.log('Form Submitted', this.addVehicleForm.value);
      this.message.success('Vehicle added successfully');
    } else {
      this.message.error('Please fill in all required fields correctly');
    }
  }
  formatLicensePlate(event: any): void {
    const value = event.target.value;
    event.target.value = value
      .toUpperCase()
      .replace(/(\w{1,3})(\d{4})/, '$1 - $2');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
