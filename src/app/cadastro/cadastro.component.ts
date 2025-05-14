import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    NgxMaskDirective
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})

export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  Actualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios : Municipio[] = [];

  constructor(
    private serviceCliente: ClienteService,
    private brasilApiService: BrasilapiService,
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
          this.cliente = clienteEncontrado;

          if(this.cliente.uf) {
            const event = {value: this.cliente.uf}
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
       }
    })

    this.carregarUFs();
  }

  carregarUFs(){
    //observible / subscrible
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log("Ocorreu um erro na sua requisição: ", erro)
    })
  }

  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log("Ocorreu um erro na sua requisição: ", erro)
    })
  }

  salvar() {
    if(!this.Actualizando){
      this.serviceCliente.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem("Salvo com sucesso");
    }
    else{
      this.serviceCliente.actualiar(this.cliente);
      this.router.navigate(['/consulta']);
       this.mostrarMensagem("Actualixado com sucesso");
    }
  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, "OK");
  }

}
