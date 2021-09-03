import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../sevices/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel;
  recordar = false;
  constructor(private auth: AuthService,
              private route: Router) 
              { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
    }

  }

  onsumit(form:NgForm){
    
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
    this.auth.Login(this.usuario)
      
      .subscribe(resp=>{
        if(this.recordar){
          localStorage.setItem('email', this.usuario.email);
        }
        console.log(resp)
        Swal.close()
        this.route.navigateByUrl('/home')
      },(err)=>{
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          width: '350px',
          heightAuto: false,
          text: err.error.error.message,
          title: 'Error al ingresar'
          
        })
      }
      )

  }

}
