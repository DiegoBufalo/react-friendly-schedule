import { Router, Route } from "react-router-dom";
import { Usuarios } from "../pages/usuario";
import { UsuariosForm } from "../pages/usuario/form";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";

export const history = createBrowserHistory();

export const Routes: React.FC = () => {
  return (
    <div>
      <Router history={history}>
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/usuarios" component={Usuarios} />
        <Route exact path="/usuario/add" component={UsuariosForm} />
        <Route exact path="/usuario/edit/:id" component={UsuariosForm} />
      </Router>
    </div>
  );
};
