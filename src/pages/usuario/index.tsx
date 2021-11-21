import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/Toast";
import UsuarioDataService from "../../services/usuario.service";
import { UsuarioData } from "../../types/type";

export const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioData[]>();
  const [usuarioSelected, setUsuarioSelected] = useState<UsuarioData>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const { catchInfoError, catchInfoSuccess } = useToast();

  const usuarioService = new UsuarioDataService();

  async function buscarUsuarios() {
    usuarioService
      .buscarUsuarios()
      .then((response) => setUsuarios(response.data))
      .catch((err) => {
        catchInfoError(err.response.data, err.response.status);
      });
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  function setActiveUsuario(usuario: UsuarioData, index: number) {
    setUsuarioSelected(usuario);
    setCurrentIndex(index);
  }

  function searchUsuario() {
    setUsuarioSelected(undefined);
    setCurrentIndex(-1);

    usuarioService
      .buscarUsuarios()
      .then((response) => setUsuarios(response.data))
      .catch((err) => {
        catchInfoError(err.response.data, err.response.status);
      });
  }

  function deleteUsuario(id: number) {
    setUsuarioSelected(undefined);
    setCurrentIndex(-1);

    usuarioService
      .desativarUsuario(id.toString())
      .then((response) => {
        buscarUsuarios();
        catchInfoSuccess("Usuário removido com sucesso!", response.status);
      })
      .catch((err) => {
        catchInfoError(err.response.data, err.response.status);
      });
  }

  return (
    <div className="list row">
      {/*       <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={this.onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.searchTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="col-md-6">
        <h4> Usuários</h4>

        <ul className="list-group">
          {usuarios &&
            usuarios.map((usuario: UsuarioData, index: number) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUsuario(usuario, index)}
                key={index}
              >
                {usuario.nome}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {usuarioSelected ? (
          <div>
            <h4>Usuario</h4>
            <div>
              <label>
                <strong>Id:</strong>
              </label>{" "}
              {usuarioSelected.id}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {usuarioSelected.nome}
            </div>
            <div>
              <label>
                <strong>E-mail:</strong>
              </label>{" "}
              {usuarioSelected.email}
            </div>
            <div>
              <label>
                <strong>CPF:</strong>
              </label>{" "}
              {usuarioSelected.cpf}
            </div>
            <div>
              <label>
                <strong>Data de Nascimento:</strong>
              </label>{" "}
              {new Date(usuarioSelected.dataNascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
            </div>
            <div>
              <label>
                <strong>Ativo:</strong>
              </label>{" "}
              {usuarioSelected.ativo ? "Sim" : "Não"}
            </div>

            <Link
              to={"/usuario/edit/" + usuarioSelected.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
            <Link
              to={"/usuarios"}
              className="badge badge-danger"
              onClick={()=>{deleteUsuario(usuarioSelected.id!)}}
            >
              Excluir
            </Link>

          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Usuario...</p>
          </div>
        )}
      </div>
    </div>
  );
};
