
export interface UsuarioData {
   id?: number;
   nome: string;
   email: string;
   cpf: string;
   dataNascimento: string; 
   ativo: boolean;
}

export interface ErrorHandler {
   errorMessage: string;
   errorMessages: string[];
 }

 export interface ToastInfo {
   message: string;
   timestamp: Date;
   status: number;
 }
 
 export interface ToastInfoContext {
   toast: ToastInfo;
 }