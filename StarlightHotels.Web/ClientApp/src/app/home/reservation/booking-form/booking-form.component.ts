import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Formule } from "src/app/models/formule.model";
import { Service } from "src/app/models/service.model";
import { ReservationService } from "../../../services/reservation.service";

@Component({
  selector: "app-booking-form",
  templateUrl: "./booking-form.component.html",
  styleUrls: ["./booking-form.component.css"],
})
export class BookingFormComponent {
  @Output() onServiceChange: EventEmitter<any> = new EventEmitter();
  allFormules: Formule[];
  allServices: Service[] = [];
  addBookingForm: FormGroup;
  services: Service;

  allComplete: boolean = false;

  constructor(
    private router: Router,
    private bookingService: ReservationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Retrieve all formulas
    this.bookingService.getFormules().subscribe((data) => {
      this.allFormules = data;
    });
  }

  /* Booking form appear in the other component */
  OnServiceChanged(formule: Formule)
  {
    this.onServiceChange.emit(formule);
  }
}
