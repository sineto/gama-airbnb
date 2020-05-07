# gama-airbnb
Este projeto tem como objetivo implementar um dos desafios aplicados pelo curso Hiring Coders da [Gama Academy](https://gama.academy). 

## O Desafio
Para o desafio foi proposto criar uma página "similar" a do [Airbnb][1]. Nos foi insentivado a usarmos nossa criatividade, além de alguns outros critérios esperados e optativos. Bem como o consumo de uma API de quartos usando Javascript puro e o uso de Flexbox.

### Critérios do desafio:
Na tela da página precisa ter cards contendo:
- **Imagens**
- **Tipo de propriedade**
- **Preço**
 
 Outras features propostas porém não obrigatórias:
 - [x] **Limite de itens por página:** paginar o resultado da API para que limite o número de itens por página;
 - [ ] **Filtro de localização:** criar um filtro que exiba apenas os locais baseados na localização que o usuário configurar na busca *(necessário criar uma nova base de dados com localização)*;
 - [x] **API do Google Maps:** incluir _pins_ onde o imóvel fica localizado no mapa;
 - [x] **Valor total da estadia:** calcular o número de estadias e mostrar uma prévia do valor total de hospedagem a partir de inputs de *check-in* e *check-out*.

## Considerações sobre este projeto
### 1. A página do [Airbnb][1] que eu resolvi "clonar", foi essa:
![página clonada do Airbnb](https://raw.githubusercontent.com/sineto/gama-airbnb/master/docs/images/airbnb.png)

Até o momento, uma prévia da página desenvolvida neste projeto:
![página clonada do Airbnb](https://raw.githubusercontent.com/sineto/gama-airbnb/master/docs/images/gamabnb.png)
### 2. Recriação da base de dados
Utilizei a base de dados de municípios brasileiros no formato JSON, possível de ser acessada [aqui][2]. Basicamente inseri alguns atributos aos itens originais fornecidos pela API do desafio. Foram inseridos aos itens os atributos `nome` e geolocalizações com `latitude` e `longitude` para assim poder plotar os pontos de localizações fictícias no mapa.

## Self-Promotion
Do you like this plugin? Come on:
-   Star and follow the repository on  [GitHub](https://github.com/sineto/gama-airbnb).
-   Follow me on
    -   [GitHub](https://github.com/sinetoami)
---
[1]: https://www.airbnb.com.br
[2]: https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/master/json/municipios.json
