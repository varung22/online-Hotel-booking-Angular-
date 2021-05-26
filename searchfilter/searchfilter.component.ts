import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css']
})
export class SearchfilterComponent implements OnInit {
  @Output() clicked = new EventEmitter<string>();
  @Output() sortByChanged = new EventEmitter<string>();
  @Output() sortOptionChanged = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<string>();
  @Output() hotelTypeChanged = new EventEmitter<string>();
  @Output() minPriceChanged = new EventEmitter<string>();
  @Output() maxPriceChanged = new EventEmitter<string>();

  sortOptionsDisabled: Boolean = true;
  isTypeFilter: Boolean;
  isPriceFilter: Boolean;
  minPrice: Number = 0;
  maxPrice: Number = 30000;
  displayError: Boolean;
  selectedHotelType = 'All';
  // sortBy = 'None';
  sortOption = 'Low-High';
  filter = 'Hotel Type';

  
  sortByRating = false;
  sortByPrice = false;

  constructor() {
    console.log('--------contructor------');
  }

  ngOnInit() {
    this.onFilterChanged('Hotel Type')
  }

  sendHotelName(hotelName: string) {
    console.log('-------searchfilter-----sending hotel name-------:');
    this.clicked.emit(hotelName);
  }

  onSortByChanged(sortByFilter: string) {
    if(sortByFilter === "Rating")
        this.sortByPrice = false;
    else if(sortByFilter === "Price")
    this.sortByRating = false;
    this.sortOptionsDisabled = !this.sortByRating && !this.sortByPrice;
    this.sortByChanged.emit(this.sortOptionsDisabled ? 'None' : sortByFilter);
  }

  onSortOptionChanged(sortOption: string) {
    console.log('\n-----------emitting : ' + sortOption);
    this.sortOptionChanged.emit(sortOption);
  }

  onFilterChanged(filter) {
    console.log('\n\n------------filter : ' + filter);
    switch (filter) {
      case 'Hotel Type':
        this.isTypeFilter = true;
        this.isPriceFilter = false;
        break;
      case 'Price Range':
        this.isTypeFilter = false;
        this.isPriceFilter = true;
        break;
      case 'None':
        this.isTypeFilter = false;
        this.isPriceFilter = false;
    }
    this.filterChanged.emit(filter);
  }

  onHotelTypeChanged(hotelType: string) {
    this.hotelTypeChanged.emit(hotelType);
  }

  onMinPriceChanged(minPrice: string) {
    this.minPrice = Number(minPrice);
    if (this.minPrice < this.maxPrice) {
      this.displayError = false;
      this.minPriceChanged.emit(minPrice);
    } else {
      this.displayError = true;
    }
  }

  onMaxPriceChanged(maxPrice: string) {
    this.maxPrice = Number(maxPrice) !== 0 ? Number(maxPrice) : 30000;
    if (this.minPrice < this.maxPrice) {
      this.displayError = false;
      this.maxPriceChanged.emit(maxPrice);
    } else {
      this.displayError = true;
    }
  }
}
