import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../sevices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onsumit(form:NgForm){
    if(!form.valid) return
   
    this.auth.Login(this.usuario)
      .subscribe(resp=>{
        console.log(resp)
      },(err)=>{
        console.log(err.error.error.message);
      }
      )

  }

}
