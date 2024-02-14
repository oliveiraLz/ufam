export class CreateEmailDto {
  nome: string;
  cpf: string;
  destinatario: string;
  mensagem: string;
  titulo: string;
  tipo: string;
  copia: boolean;
}
