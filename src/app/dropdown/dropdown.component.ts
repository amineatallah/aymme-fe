import {
  Component, OnInit, Input, Output, EventEmitter,
  ChangeDetectionStrategy, OnChanges, SimpleChanges, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() items: any[] = [];
  @Input() defaultValue: string;
  @Input() defaultHeader: string;

  @Output() setSelectedValue: EventEmitter<string> = new EventEmitter<string>();
  selectedValue: string;
  isOpen = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultValue && changes.defaultValue.currentValue) {
      this.selectedValue = changes.defaultValue.currentValue.length ? changes.defaultValue.currentValue : this.defaultHeader;
    }
  }

  ngOnInit() {
    this.selectedValue = this.defaultValue || this.defaultHeader;
  }

  onChanged: any = () => { };
  onTouched: any = () => { };

  writeValue(val) {
    this.selectedValue = val;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setSelectedValueOnParent(item: string): void {
    this.selectedValue = item;
    this.setSelectedValue.emit(item);
    this.onChanged(item);
    this.onTouched();
  }

  toggleDropdown($event: any): void {
    $event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
