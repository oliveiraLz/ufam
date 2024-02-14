import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedParametrosTable1707486099771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO configuracao.parametro (chave, valor, created_at, updated_at, deleted_at) VALUES
    ('EMAIL_HOST', 'email-ssl.com.br', now(), now(), NULL),
    ('EMAIL_LOGIN', 'carlinhos@e-sgi.com.br', now(), now(), NULL),
    ('EMAIL_PASSWORD', 'Agdm03#123.x', now(), now(), NULL),
    ('EMAIL_PORT', '465', now(), now(), NULL),
    ('EMAIL_FROM', '"Tribunal de Justiça Maçônico" <carlinhos@e-sgi.com.br>', now(), now(), NULL),
    ('EMAIL_BODY', '<!DOCTYPE html><html lang="pt-br"><head> <title>Email</title> <style>table{display: flex; justify-content: center; height: 100vh; align-items: center; width: 100%; /* Ajuste para preencher a largura da página */}body{margin: 0;}span{font-family: Roboto, sans-serif; font-weight: 900}.container{width: 600px; /* Ajuste para aumentar a largura do email */ margin: 0 auto; /* Centralizar o email na página */}.logo{display: flex; padding-left: 2rem; align-items: center;}.banner1{display: flex; background-repeat: no-repeat; background-size: cover; width: 100%; height: 150px; align-items: center; background-image: url("https://github.com/oliveiraLz/svgsMalhete/blob/main/assetsMalhete/AUT_1535%202%20(1).png?raw=true"); background-color: rgba(0, 0, 0, 0.5); background-blend-mode: multiply;}.banner2{width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; color: var(--brancoPadrao); font-family: Arial, Helvetica, sans-serif; font-size: 0.8rem; font-weight: 900; letter-spacing: 0.035rem; background-repeat: no-repeat; background-size: contain; padding-left: 1rem; line-height: 1.6rem;}.banner2 img{width: auto; height: 100px;}.main{background-color: #ffffff; width: 100%; padding-top: 1rem; padding-left: 2rem;}.main h1{font-family: Montserrat, sans-serif; color: #341406; font-size: 1.8rem; letter-spacing: 0.08rem; font-weight: 900;}.main_text{font-family: Roboto, sans-serif; font-size: 1rem; line-height: 1rem; color: #571d05;}.button{font-family: Roboto, sans-serif; text-decoration: none; display: inline-block; padding: 15px 7px; background-color: #892e07; color: #eece96; border-radius: 5px; border: none; cursor: pointer; font-size: 0.7rem;}.button:visited{color: #eece96;}.aviso{font-family: Roboto, sans-serif; font-size: 0.7rem; color: #c1bcba; line-height: 1rem;}.footer{background-image: url("https://github.com/oliveiraLz/svgsMalhete/blob/main/assetsMalhete/Vector%206.png?raw=true"); width: 100%; height: 80px;}</style></head><body> <table cellspacing="0" cellpadding="0" border="0"> <tr> <td> <div class="container"> <header style="display: flex; background: #341406; height: 50px; width: 100%; align-items: center;"> <div class="logo" style="margin-top: 1rem;"> <img src="https://github.com/oliveiraLz/svgsMalhete/blob/main/assetsMalhete/Group%20(1).png?raw=true" alt="" width="20px" height="20px" style="margin-right: 0.5rem;"> <img src="https://github.com/oliveiraLz/svgsMalhete/blob/main/assetsMalhete/Frame%2026%20(1).png?raw=true" alt="" width="100px" height="20px" style="margin-left: 0.5rem;"> </div></header> <section class="banner1"> <div class="banner2"> <img src="https://github.com/oliveiraLz/svgsMalhete/blob/main/assetsMalhete/image%204.png?raw=true" alt="" height="100px" style="margin-top: 1rem;"> <h2 style="margin-left: 1.2rem; margin-top: 2.5rem; color:#ffffff">TRIBUNAL DE JUSTIÇA MAÇÔNICO <br>GRANDE LOJA MAÇÔNICA DO AMAZONAS </h2> </div></section> <main class="main"> <h1 style="margin-left: 2.2rem; font-family: Montserrat, sans-serif; font-weight: 900; color:#341406">Movimentação de processo</h1> <h3 class="main_text" style="margin-left: 2.2rem; font-family: Roboto, sans-serif; font-size: .9rem;">Processo: <span style="font-family: Roboto, sans-serif; font-weight: 900;">%PROCESSO_NUMBER%</span><br>Movimentado em: <span style="font-family: Roboto, sans-serif; font-weight: 900;">%PROCESSO_DATA%</span> às <span style="font-family: Roboto, sans-serif; font-weight: 900;">%PROCESSO_HORA%</span>.<br><br><br><br>Para maiores detalhes clique no botão abaixo: </h3> <a class="button" href="###" style="margin-left: 2.2rem; color: #eece96;">CONSULTE O PROCESSO</a><br><br><br><br><h3 class="aviso" style="margin-left: 2.2rem; font-family: Roboto, sans-serif;">Este é um e-mail automático e não precisa ser respondido. <br></h3> </main> <footer class="footer"></footer> </div></td></tr></table></body></html>', now(), now(), NULL),
    ('EMAIL_URL', 'https://malhete-stage.netlify.app/processo/', now(), now(), NULL);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
