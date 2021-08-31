import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBX0J_g-tvx1MTrpyzijdtRqQGgf3rcMaQ ';
  private userToken = '';
  //Crear nuevo usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(private http: HttpClient) {


   }

   logout(){


   }


   Login(usuario:UsuarioModel){
    const authData = {
      email: usuario.email,
      password: usuario.pasword,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        console.log('entro al mapa del servicio')
        return resp;
      })
   );


   }

   nuevoUsuario(usuario: UsuarioModel){
       const authData = {
         email: usuario.email,
         password: usuario.pasword,
         returnSecureToken: true
       }

       return this.http.post(
         `${this.url}signUp?key=${this.apikey}`,
         authData
       ).pipe(
         map(resp => {
           this.guardarToken(resp['idToken']);
           console.log('entro al mapa del servicio')
           return resp;
         })
      );

   }

   private guardarToken(idToken: string) {
     this.userToken = idToken;
     localStorage.setItem('token', idToken);

   }

   leertoken(){
     if(localStorage.getItem('token')){
       this.userToken = localStorage.getItem('token')
     }else{
       this.userToken = '';
     }

     return this.userToken;
   }
}
