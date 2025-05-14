import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTE = '_CLIENTE';

  constructor() {}

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string) : Cliente[] {

    const clientes = this.obterStorage();
    if (!nomeBusca) {
      return clientes;
    }

    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1);//O metodo filter() Retorna um novo array
    
  }

  buscarPeloId(id: string) : Cliente | undefined{
    const clientes = this.obterStorage();
    return clientes.find(c => c.id === id); //O metodo finf() Retorna apema um elemento do array
    
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTE);
    if (repositorioClientes) {
      const Clientes: Cliente[] = JSON.parse(repositorioClientes);
      return Clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(clientes));
    return clientes;
  }
}
