import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'app/services/alert.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Alert } from 'app/model/alert';

@Component({
  selector: 'app-alert-editor',
  templateUrl: './alert-editor.component.html',
  styleUrls: ['./alert-editor.component.scss']
})
export class AlertEditorComponent implements OnInit {

  Data: any;
  AlertForm: FormGroup;
  Edicion: boolean;

  constructor(private alertService:AlertService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.AlertForm = this._fb.group({
      Title : ['', Validators.required],
      Content : ['', Validators.required],
      Date : [''],
      Images : ['']
    });

    if (Id !== null)
    {
      this.Edicion = true;
      var owner  = this.alertService.getAlert(Id).subscribe(info => {
        if (info !== undefined)
        {
          this.AlertForm.controls['Nombres'].setValue(info.Title)
          this.AlertForm.controls['Apellidos'].setValue(info.Content)
          this.AlertForm.controls['Correo'].setValue(info.Date)
          this.AlertForm.controls['Telefono'].setValue(info.Images)
          this.AlertForm.addControl('id', new FormControl(info.id))
        } else
        {
          this.router.navigateByUrl('admin/alertas')
        }
      }, error => {
        alert('Hubo un error al intentar obtener la alerta')
      });
    } else 
    {
      this.Edicion = false;
    }
  }

  Save() {
    if (this.Edicion == true)
    {
      this.alertService.updateAlert(this.AlertForm.value as Alert).then(success => {
        alert('Propietario actualizado!')
        this.router.navigateByUrl('admin/alertas')
      }, error => {
        alert('Hubo un error al actualizar la alerta')
      })
      
    } else 
    {
      this.alertService.createAlert(this.AlertForm.value as Alert).then(success => {
        alert('Propietario creado!')
      this.router.navigateByUrl('admin/alertas')
      }, error => {
        alert('Hubo un error al crear la alerta')
      })
    }
  }

  Delete() {
    var id = this.AlertForm.get('id').value;
    this.alertService.deleteAlert(id).then(success => {
      alert('Propietario eliminado!')
      this.router.navigateByUrl('admin/alertas')
    }, error => {
      alert('Hubo un error al eliminar la alerta')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/alertas')
    }
  }

}
