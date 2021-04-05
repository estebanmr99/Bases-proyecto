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

class Search {
  constructor(public buscar: string = '') { }
}

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [UserService]
})
export class DeleteComponent implements OnInit {
  model: Signup = new Signup();
  @ViewChild('f') form: any;

  modelSearch: Search = new Search();
  @ViewChild('s') formSearch: any;

  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  afterAsync(){
    this.model.setCarnet(this.user.carnet);
    this.model.setNombre(this.user.nombre);
    this.model.setBeca(this.user.beca);
    this.model.setPrecio(this.user.precio);
  }

  onSearch() {
    this.userService.getUser(+this.modelSearch.buscar).subscribe(user => this.user = user,error => console.log("Error: ", error), () => this.afterAsync());
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.deleteUser(+this.model.carnet);
      this.formSearch.reset();
      console.log(this.form.value.user);
      this.form.reset();
    }
  }
}
