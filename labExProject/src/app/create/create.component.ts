import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.service';

class Signup {
  constructor(public carnet: string = '',
    public nombre: string = '',
    public beca: string = '',
    public precio: string = '') {
  }

  setCarnet(carnet: number) {
    this.carnet = String(carnet);
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  setBeca(beca: string) {
    this.beca = beca;
  }

  setPrecio(precio: number) {
    this.precio = String(precio);
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [UserService]
})
export class CreateComponent implements OnInit {
  model: Signup = new Signup();
  @ViewChild('f') form: any;

  user: User = { carnet: 0, nombre: '', beca: '', precio: 0 };

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.user.carnet = +this.model.carnet;
      this.user.nombre = this.model.nombre;
      this.user.beca = this.model.beca;
      this.user.precio = +this.model.precio;

      this.userService.insertUser(this.user);

      this.form.reset();

      console.log(this.user);
    }
  }
}
