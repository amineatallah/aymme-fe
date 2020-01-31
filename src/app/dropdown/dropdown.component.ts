import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() defaultValue: string;
  @Input() defaultHeader: string;

  @Output() setSelectedValue: EventEmitter<string> = new EventEmitter<string>();

  selectedValue: string;
  isOpen = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.defaultValue && changes.defaultValue.currentValue ) {
      this.selectedValue = changes.defaultValue.currentValue.length ? changes.defaultValue.currentValue : this.defaultHeader;
    }
  }

  ngOnInit() {
    this.selectedValue = this.defaultValue || this.defaultHeader;
  }

  setSelectedValueOnParent(item: string): void {
    this.selectedValue = item;
    this.setSelectedValue.emit(item);
  }

  toggleDropdown($event: any): void {
    $event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
