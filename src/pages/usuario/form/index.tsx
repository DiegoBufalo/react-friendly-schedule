import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useToast } from "../../../context/Toast";
import { history } from "../../../routes";
import UsuarioDataService from "../../../services/usuario.service";
import { UsuarioData } from "../../../types/type";

export const UsuariosForm: React.FC = () => {
  const { catchInfoError, catchInfoSuccess } = useToast();
  const { id } = useParams<{ id: string }>();
  const [usuario, setUsuario] = useState<UsuarioData>({} as UsuarioData);
  const usuarioService = new UsuarioDataService();

  useEffect(() => {
    if (id) {
      usuarioService
        .buscarUsuario(id)
        .then((response) => setUsuario(response.data))
        .catch((err) => {
          catchInfoError(err.response.data, err.response.status);
        });
    }
  }, [id]);

  const handleSubmitUsuario = async (
    nome: string,
    email: string,
    cpf: string,
    dataNascimento: string
  ) => {
    const data: UsuarioData = {
      nome,
      email,
      cpf: cpf.replaceAll(".", "").replace("-", ""),
      dataNascimento,
      ativo: true,
    };

    if (id) {
      usuarioService
        .atualizarUsuario(id, data)
        .then((response) => {
          catchInfoSuccess("Usuário atualizado com sucesso!", response.status);
          history.goBack();
        })
        .catch((err) => {
          catchInfoError(err.response.data, err.response.status);
        })
    } else {
      usuarioService
        .criarUsuario(data)
        .then((response) => {
          catchInfoSuccess("Usuário criado com sucesso!", response.status);
          history.goBack();
        })
        .catch((err) => {
          catchInfoError(err.response.data, err.response.status);
        });
    }
  };

  return (
    <div className="submit-form">
      <Formik
        enableReinitialize
        initialValues={{
          id: usuario.id ? usuario.id : undefined,
          nome: usuario.nome ? usuario.nome : "",
          email: usuario.email ? usuario.email : "",
          cpf: usuario.cpf ? usuario.cpf : "",
          dataNascimento: usuario.dataNascimento ? usuario.dataNascimento : "",
        }}
        onSubmit={(values) => {
          handleSubmitUsuario(
            values.nome,
            values.email,
            values.cpf,
            values.dataNascimento
          );
        }}
      >
        {({ values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <Field id="nome" name="nome" placeholder="Nome" />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <Field
                id="email"
                name="email"
                placeholder="E-mail"
                type="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <Field id="cpf" name="cpf" placeholder="CPF" />
            </div>

            <div className="form-group">
              <label htmlFor="dataNascimento">Data Nascimento</label>
              <Field
                id="dataNascimento"
                name="dataNascimento"
                placeholder="Doe"
                type="date"
              />
            </div>

            <button className="btn btn-success" type="submit">
              {id ? "Salvar" : "Cadastrar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
