import React, { useContext, createContext, ReactNode, useState} from 'react';
import { ErrorHandler, ToastInfo } from '../types/type';

interface ToastProviderProps {
    children:ReactNode;
}

interface ToastContextData {
    catchInfoError: (erro: ErrorHandler, statusHttp: number) => void;
    catchInfoSuccess: (message: string, statusHttp: number) => void;
    state: ToastInfo;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider:React.FC<ToastProviderProps> =({ children })=>{
    const [state, setState] = useState<ToastInfo>({} as ToastInfo);

    function geraToast(message: string, statusHttp: number): ToastInfo {
        return {
          message,
          status: statusHttp,
          timestamp: new Date(),
        };
      }
      
     function catchInfoError(
        erro: ErrorHandler,
        statusHttp: number,
      ) {
        
        const listaErros = erro.errorMessages || [
          'Algo inesperado aconteceu. Estamos trabalhando em uma solução'];
      
        const toastInfos: ToastInfo = geraToast(
          erro.errorMessage || listaErros.sort()[0], statusHttp);
      
         setState(toastInfos);
      }
      
     function catchInfoSuccess(
        message: string,
        statusHttp: number,
      ) {
        const toastInfos: ToastInfo = geraToast(message, statusHttp);
      
        setState(toastInfos);
      }

    return(
        <ToastContext.Provider value={{catchInfoError, catchInfoSuccess, state}}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast():ToastContextData {
    const context = useContext(ToastContext);

    return context;
}