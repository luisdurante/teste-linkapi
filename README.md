# Teste LinkAPI
O teste consiste em criar uma integração entre as plataformas Pipedrive e Bling, movendo os "Negócios" com status "won" do Pipedrive e criando "Pedidos" dentro do Bling, além de inserir em um banco de dados mongodb os "Negócios" agregados por dia e valor total.

## Como rodar
- Clone o repositório;
- Ao cloná-lo, rode o comando: `npm i` para instalar todas as dependências necessárias;
- Para executar a integração basta rodar o comando: `npm run integration`;
- Para verificar o endpoint dos "Negócios" agregados por dia e valor total, basta rodar o comando `node .` e acessar o endpoint :
	 >  GET - localhost:3000/aggregatedDeals

No momento, já existem cadastrados três "Negócios" agregados para ter uma pré visualização.

OBS: adicionar o arquivo .env eviado por email com as credenciais necessárias na raiz do projeto
