import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { generalConsultationService } from 'app/services/general-consultation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralConsultation } from 'app/model/generalConsultation';

@Component({
  selector: 'app-general-consultation-editor',
  templateUrl: './general-consultation-editor.component.html',
  styleUrls: ['./general-consultation-editor.component.scss']
})
export class GeneralConsultationEditorComponent implements OnInit {

  Data: any;
  ConsultationForm: FormGroup;
  Edicion: boolean;

  constructor(private modelService:generalConsultationService,
              private _fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.ConsultationForm = this._fb.group({
      Title : ['', Validators.required],
      Message : ['', Validators.required],
      Date : ['']
    });
   
    if (Id !== null)
    {
      this.Edicion = true;
      var owner  = this.modelService.getGeneralConsultation(Id).subscribe(info => {
        if (info !== undefined)
        {
          this.ConsultationForm.controls['Title'].setValue(info.Title)
          this.ConsultationForm.controls['Message'].setValue(info.Message)
          this.ConsultationForm.controls['Date'].setValue(info.Date)
          this.ConsultationForm.addControl('id', new FormControl(info.id))
        } else
        {
          this.router.navigateByUrl('admin/consultas-generales')
        }
      }, error => {
        alert('Hubo un error al intentar obtener la consulta general')
      });
    } else 
    {
      this.Edicion = false;
    }
  }


  Save() {
    this.ConsultationForm.controls['Date'].setValue(new Date());

    if (this.Edicion == true)
    {
      this.modelService.updateGeneralConsultation(this.ConsultationForm.value as GeneralConsultation).then(success => {
        alert('Consultas General actualizado!')
        this.router.navigateByUrl('admin/consultas-generales')
      }, error => {
        alert('Hubo un error al actualizar el consulta general')
      })
      
    } else 
    {
      this.modelService.createGeneralConsultation(this.ConsultationForm.value as GeneralConsultation).then(success => {
        alert('Consultas General creado!')
      this.router.navigateByUrl('admin/consultas-generales')
      }, error => {
        alert('Hubo un error al crear el consulta general')
      })
    }
  }

  Delete() {
    var id = this.ConsultationForm.get('id').value;
    this.modelService.deleteGeneralConsultation(id).then(success => {
      alert('Consultas General eliminado!')
      this.router.navigateByUrl('admin/consultas-generales')
    }, error => {
      alert('Hubo un error al eliminar el consulta general')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/consultas-generales')
    }
  }
}
