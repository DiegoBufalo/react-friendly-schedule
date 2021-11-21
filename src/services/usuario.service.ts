import { UsuarioData } from "../types/type";
import http from "./http-common";


export default class UsuarioDataService {

  buscarUsuarios() {
    return http.get<UsuarioData[]>("/usuarios");
  }

  buscarUsuario(id: string) {
    return http.get<UsuarioData>(`/usuarios/${id}`);
  }

  criarUsuario(data: UsuarioData) {
    return http.post<UsuarioData>("/usuarios", data);
  }

  atualizarUsuario(id: string, data: UsuarioData) {
    return http.put<UsuarioData>(`/usuarios/${id}`, data);
  }
  
  desativarUsuario(id: string) {
    return http.delete(`/usuarios/${id}`);
  }

}
