### Backend

### Instalar Dependências
```bash
$~ yarn
```
### Migrations
```bash
$~ yarn run knex:migrate
```
### Executar ?
```bash
$~ yarn run dev
```
### Entidades
* ### Pontos de Coleta
  * Imagem
  * Nome
  * Email
  * Whatsapp
  * Endereço (GEO(lat, long))
    * Cidade, UF
* ### Itens de Coleta
  * Imagem
  * Título
* ### item_points(JOIN(Pontos de Coleta, Itens de Coleta))

### Rotas
...