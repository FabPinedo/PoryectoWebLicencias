import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-admin-licencias';
  public auth: boolean = true;
  public usuarioPanel: string;


  logout(){
    alert("Saliste del sistema - Prueba")
  }

}
