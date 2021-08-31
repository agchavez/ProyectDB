import { formatCurrency, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../sevices/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:UsuarioModel;  

  constructor(private auth: AuthService) { }

  ngOnInit() { 
    
    this.usuario = new UsuarioModel();
 }

   onSummit(form:NgForm){
    if(!form.valid) return
     this.auth.nuevoUsuario(this.usuario)
     .subscribe(resp=> {
       console.log(resp);
     }, (err)=>{
        alert(err.error.error.message);
     });
   }
  

}
