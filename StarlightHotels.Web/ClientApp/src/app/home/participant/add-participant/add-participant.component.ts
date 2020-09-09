import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pays } from '../../../models/pays.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../../services/hotel.service';
import { ParticipantModel } from '../../../models/participant.model';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.sass']
})
export class AddParticipantComponent implements OnInit {

  @Input() participant: ParticipantModel = {} as ParticipantModel;

  addPart: FormGroup;

  maxDate: Date;
  allCountries: Pays[];
  paysId: number = 0;

  error: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private service: HotelService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.addPart = this.addPartForm();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.service.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
  }


  addPartForm(): FormGroup {
    return this.fb.group({
      dateOfBirth: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      addressMail: ['', [Validators.required]],
    });
  }
}
