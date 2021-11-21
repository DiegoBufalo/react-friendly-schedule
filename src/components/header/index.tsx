/* eslint-disable jsx-a11y/anchor-is-valid */
import { history } from "../../routes";
import { Container } from "./style";
import "bootstrap/dist/css/bootstrap.min.css";

export const Header: React.FC = () => {
  return (
    <Container>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="nav-link" onClick={() => history.push("/")}>
          Friendly Schedule
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={() => history.push("/usuarios")}>
              Usuários
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => history.push("/usuario/add")}
            >
              Adicionar Usuários
            </a>
          </li>
        </div>
      </nav>
    </Container>
  );
};
