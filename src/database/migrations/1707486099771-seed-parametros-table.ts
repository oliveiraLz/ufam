import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedParametrosTable1707486099771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO configuracao.parametro (chave, valor, created_at, updated_at, deleted_at) VALUES
    ('EMAIL_HOST', 'email-ssl.com.br', now(), now(), NULL),
    ('EMAIL_LOGIN', 'carlinhos@e-sgi.com.br', now(), now(), NULL),
    ('EMAIL_PASSWORD', 'Agdm03#123.x', now(), now(), NULL),
    ('EMAIL_PORT', '465', now(), now(), NULL),
    ('EMAIL_FROM', '"Meeting On Materials For Energy Applications" <carlinhos@e-sgi.com.br>', now(), now(), NULL),
    ('EMAIL_BODY', '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title></head><body style="width:600px;margin:0 auto;padding:0 auto"><main style="display:flex;flex-direction:column;gap:.5rem"><h1>Assunto: Confirmação de Submissão de Trabalho para MMEA-AM</h1><h3>Prezado ##NOME##</h3><p>Gostaríamos de agradecer por submeter seu trabalho para avaliação. Sua participação é fundamental para o sucesso do nosso evento e estamos muito animados para revisar seu trabalho.</p><h4>Aqui está os detalhes da sua submissão:</h4><div style="display:block"><h5 style="margin-top:.2rem;margin-bottom:.2rem">Nome Completo: ###NOME###</h5><h5 style="margin-top:.2rem;margin-bottom:.2rem">CPF: ##CPF##</h5><h5 style="margin-top:.2rem;margin-bottom:.2rem">Mensagem: ##MENSAGEM##</h5><h5 style="margin-top:.2rem;margin-bottom:.2rem">Tipo: ##TIPO##</h5></div><p>Por favor, esteja ciente de que iremos revisar o seu trabalho e entraremos em contato novamente assim que possível com informações sobre o status da sua submissão.</p><h6>Atenciosamente,</h6><h6>Meeting on Materials for Energy Applications in Amazonas</h6></main></body></html>', now(), now(), NULL),
    ('EMAIL_BODY_UFAM', '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title></head><body style="width:600px;margin:0 auto;padding:0 auto"><main style="display:flex;flex-direction:column;gap:.5rem"><h1>Assunto: Submissão de Trabalho para MMEA-AM</h1><h3>Detalhes da submissão:</h3><div style="display:block"><h5 style="margin-top:.2rem;margin-bottom:.2rem">Nome Completo: ##NOME##</h5><h5 style="margin-top:.2rem;margin-bottom:.2rem">CPF: ##CPF##</h5><h5 style="margin-top:.2rem;margin-bottom:.2rem">Mensagem: ##MENSAGEM##</h5><h5 style="margin-top:.2rem;margin-bottom:.2rem">Tipo: ##TIPO##</h5></div></main></body></html>', now(), now(), NULL),
    ('EMAIL_URL', 'https://malhete-stage.netlify.app/processo/', now(), now(), NULL);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
