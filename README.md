# PROJETO SELEÇÃO APP MASTERS - https://www.appmasters.io/

# PROJETO - 3 Bancos de dados.

- **Padrão de Projeto: Package by Feature - Padrao de Projeto e Repositories**  - Optei por utilizar eles pois acredito que seja mais facil a leitura)
  https://phauer.com/2020/package-by-feature/
- **ORM : Prisma** - Nunca havia utilizado essa ORM, mesmo com algumas  dificuldades consegui entregar  com a ajuda da boa documentação  do Prisma.
- **Banco de dados: Postgress** -Tenho maior Facilidade
API do projeto de doação![banco de dados Relacionado](https://user-images.githubusercontent.com/29778550/183327172-4dfaffb0-0616-4d70-af11-6c035372661d.png)

# Comunicação;

- Utilizamos KanBan como guia para nosso Proketo

![kaban](https://user-images.githubusercontent.com/29778550/183327332-36f91526-63c9-4b81-93b1-171301173010.png)

- Reuniões diarias de pelo menos 10 min por voice

- Disponibilidade para texto o dia todo

# Documentação

 - https://api-donation.herokuapp.com/api-docs/

![docs](https://user-images.githubusercontent.com/29778550/183327843-5cdaba77-3414-49bb-84d8-e99340f5769a.png)



# Requisitos -  3 Etapa

- [x]  adicionar CORS para aceitar chamadas de outro domínio
- [x]  Fazer deploy do projeto heroku
- [x]  Só retornar sucesso se salvar no banco, e objetos que foram salvos (com seus respectivos `id`)
- [x]  Usar dotenv, para carregar as informações de conexão com o banco de dados, obtendo do seu .env local, e das configurações de ambiente do heroku (ou outro que você preferir).
- [x]  Não é permitido enviar campos com `""` ou `" "`, ou seja, ou vem um valor qualquer, ou vem null. Espaço vazio, string vazia, deve ser recusado.
- [x]  Adicionar banco de dados no projeto
- [x]  Validar email de forma completa
- [x]  Não é permitido enviar campos com `""` ou `" "`, ou seja, ou vem um valor qualquer, ou vem null. Espaço vazio, string vazia, deve ser recusado.
- [x]  caso tenha feito a tabela de doador separada da doação, se vier um post com email ou telefone que já exista, substitua os dados existente pelos novos recebidos, assim, os últimos dados enviados passam as ser os válidos



