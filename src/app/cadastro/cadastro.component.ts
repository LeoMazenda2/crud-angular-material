import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})

export class CadastroComponent implements OnInit {

  Cliente: Cliente = Cliente.newCliente();
  Actualizando: boolean = false;

  constructor(
    private serviceCliente: ClienteService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) =>{
      const params = query['params']
       const id = params['id']
       if(id){
        let clienteEncontrado =  this.serviceCliente.buscarPeloId(id)
        if(clienteEncontrado){
          this.Actualizando = true;
          this.Cliente = clienteEncontrado;
        }      
       }
    })  
  }
  
  salvar() {
    if(!this.Actualizando){
      this.serviceCliente.salvar(this.Cliente);
      this.Cliente = Cliente.newCliente();
    }
    else{
      this.serviceCliente.actualiar(this.Cliente);
      this.router.navigate(['/consulta']);
    }
  }
}
