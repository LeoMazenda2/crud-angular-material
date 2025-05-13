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

  obterStorage(): Cliente[] {
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
