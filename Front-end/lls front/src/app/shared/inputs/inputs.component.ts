import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputsComponent),
      multi: true,
    },
  ],
})
export class InputsComponent implements OnInit,OnDestroy, ControlValueAccessor {
  @Input() formControl!: FormControl;
  @Input() type = 'text';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() errorMessages: any;
  @Input() minimum = 0;
  @Input() maximum = 100;
  @Input() transparent = false;
  langSubscription!: Subscription;
  @Input() formControlName: any;
  isArabic: boolean = false;
  value = '';
  onChange!: (event: any) => void;
  onTouched!: (event: any) => void;
  @Input() disabled = false;
  @Input() blackLabel: boolean = false;
  @Input() none: boolean = false;
  @Input() opacity: boolean = false;
  @Input() contactUs!: boolean;
  @Input() required: boolean = false;
  @Input() span: boolean = false;
  @Input() textHide: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.formControlName = this.getFormControlName(this.formControl);

  }

  /* Cancel Language Subscription On Component Destroy */
  ngOnDestroy(): void {
    // this.langSubscription.unsubscribe();
  }

  /* Set Input Value */
  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  /* Set Value Changes */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /* Detect Input Touch  */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /* Set Input Disable  */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // /* Get Form Control Name From Form Group */
  getFormControlName(c: any) {
    const formGroup = c.parent.controls;
    return (
      Object.keys(formGroup!).find((name: any) => c === formGroup[name]) || null
    );
  }

  /* Detect Input Value Changes */
  detectValueChange(target: any): void {
    const value = target.value;
    if (value) {
      if (this.type === 'number') {
        if (isNaN(value)) {
          this.formControl?.setErrors({ notNumber: true });
        }
      } else {
        this.onChange(value);
      }
    } else {
      this.onChange('');
    }
  }
}
