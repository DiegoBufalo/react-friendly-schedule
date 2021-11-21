import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../../context/Toast';

export const Toast: React.FC = () => {
  const { state } = useToast();

  useEffect(() => {
    toast.clearWaitingQueue();
    toast.dismiss();

    if (state.status === 403 || state.status === 401) {
      toast.error('Sua sessão expirou. Clique aqui para entrar novamente.');
    } else if (state.status < 300) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.status, state.timestamp]);

  const redirectLogin = () => {
    window.location.href = '/';
  };

  return (
    <>
      {state.status !== 403 && state.status !== 401 ? (
        <ToastContainer
          position="top-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
          limit={1}
        />
      ) : (
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
          limit={1}
          onClick={() => redirectLogin()}
        />
      )}
    </>
  );
};