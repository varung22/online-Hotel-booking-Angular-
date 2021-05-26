import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { HotelService } from '../../services/hotel.service';
import { Booking } from '../../classes/booking';
import { ConfirmBookingDialogComponent } from '../confirm-booking-dialog/confirm-booking-dialog.component';
import { BookingOrder } from '../../classes/Booking-order';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  booking_details: Booking;
  room_types: Array<string>;
  userForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  email: FormControl;
  phone: FormControl;
  contact: FormControl;
  comments: FormControl;
  dialogResult;

  discount = false;
  discountTotal: number;

  isLoggedIn = false;

  constructor(private hotelService: HotelService, private userServiceService: UserServiceService, public dialog: MatDialog) {
    console.log('------------constructor----------');
    this.booking_details = this.hotelService.getBookingDetails();
    this.setRoomTypes();
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    console.log('\n\n--------------Booking in BookingComponent-----------');
    console.log(this.booking_details);
    this.discount = this.diffBwnDates(this.booking_details.check_in, this.booking_details.check_out) > 3;
    if(this.discount) {
      this.discountTotal = this.booking_details.total_with_tax / 10;
      this.booking_details.total_with_tax = this.booking_details.total_with_tax - this.discountTotal;
    }
  }

  diffBwnDates(date1, date2) {
    var difference_In_Time = date2.getTime() - date1.getTime();
    return difference_In_Time / (1000 * 3600 * 24);
  }

  createFormControls() {
    this.firstname = new FormControl('', Validators.required);
    
    this.lastname = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.phone = new FormControl('', [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(10), 
      Validators.pattern(/^[0-9]\d*$/)
    ]);
    this.contact = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}')
    ]);
    this.comments = new FormControl();

    this.addConnectedUserDetails();
  }

  addConnectedUserDetails() {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user !== undefined && user !== null) {
      this.firstname.setValue(user.firstName);
      this.lastname.setValue(user.lastName);
      this.phone.setValue(user.phone);
      this.email.setValue(user.email);
    }
  }

  createForm() {
    this.userForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      contact: this.contact,
      comments: this.comments
    });
  }

  setRoomTypes() {
    this.room_types = Object.keys(this.booking_details.room_info);
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmBookingDialogComponent, {
      width: '600px',
      data: 'Are you sure you want to confirm booking?'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);

      let booking = new BookingOrder();
      booking.firstName = this.userForm.value.firstname;
      booking.lastName = this.userForm.value.lastname;
      booking.phone = this.userForm.value.phone;
      booking.curUser = this.userForm.value.email;
      booking.hotelId = this.booking_details.hotel_id;
      booking.hotelName = this.booking_details.hotel_name;
      booking.comments = this.userForm.value.comments;
      booking.checkIn = this.booking_details.check_in;
      booking.checkOut = this.booking_details.check_out;
      booking.noAdults = this.booking_details.no_adults;
      booking.noChildren = this.booking_details.no_children;
      booking.roomInfo = JSON.stringify(this.booking_details.room_info);
      this.hotelService.addbookingOrder(booking).subscribe(
        order  => {
          this.dialogResult = result;
      });
    });
  }
}
