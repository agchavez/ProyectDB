import { formatCurrency, NgForOf } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../sevices/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:UsuarioModel;  
  recordar = false;

  constructor(private auth: AuthService,
              private route:Router) 
              { }

  ngOnInit() { 
    
    this.usuario = new UsuarioModel();
 }

   onSummit(form:NgForm){
    if(!form.valid) return
    Swal.fire({
      icon: 'info',
      title: 'Espere por favor...',
      html: 'Obteniendo datos del usuario',// add html attribute if you want or remove
      allowOutsideClick: false,
      width: '350px',
      heightAuto: true,
      onBeforeOpen: () => {
          Swal.showLoading()
      },
  }); 
     this.auth.nuevoUsuario(this.usuario)
     .subscribe(resp=> {
       console.log(resp);
       Swal.close();
       if(this.recordar){
        localStorage.setItem('email', this.usuario.email);
      }
       this.route.navigateByUrl('/home');
     }, (err)=>{
        alert(err.error.error.message);
        Swal.fire({
          icon: 'error',
          width: '350px',
      heightAuto: false,
          text: err.error.error.message,
          title: 'Error al ingresar'
          
        })
     });
   }
  

}
