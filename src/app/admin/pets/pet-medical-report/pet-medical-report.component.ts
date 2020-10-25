import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalHistory, Pet, Prescription } from 'app/model/pet';
import { User } from 'app/model/user';
import { PetService } from 'app/services/pet.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-pet-medical-report',
  templateUrl: './pet-medical-report.component.html',
  styleUrls: ['./pet-medical-report.component.scss']
})
export class PetMedicalReportComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private _fb: FormBuilder,
              private authService: AuthService,
              private modelService: PetService,) { }

  pet : Pet;
  user : User;
  medicalHistory: MedicalHistory;
  prescription: Prescription[];
  enableAddMedicalHistory: boolean;

  medicalHistoryForm = this._fb.group({
    Comments : [''],
  });

  prescriptionList = this._fb.array([]);

  prescriptionForm = this._fb.group({
    Nombre : [''],
    Description : [''],
    Frecuency : [''],
    InitDate : [''],
    FinalDate : [''],
  })

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.user = await this.authService.getUser();

    this.modelService.getPet(Id).subscribe((info) => {
      this.pet = info;
    })
  }

  Save() {
    this.medicalHistory = {
      IdCompany : this.user.Id_company,
      Date : new Date(),
      Comments : this.medicalHistoryForm.controls['Comments'].value,
      Prescription : []
    }

    if (!this.pet.MedicalHistory) {
      this.pet.MedicalHistory = []
    }

    this.pet.MedicalHistory.push(this.medicalHistory);
    

    this.modelService.updatePet(this.pet).then((pet) => {
      alert(pet)
    })
  }

  AddMedicalHistory() {
    this.enableAddMedicalHistory = true;
    this.prescription = [];
  }

  Addprescription() {
    this.prescriptionList.push(this._fb.group({
      Nombre : [''],
      Description : [''],
      Frecuency : [''],
      InitDate : [''],
      FinalDate : [''],
    }))
  }

}
