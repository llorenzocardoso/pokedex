# Pokédex
#### Uma aplicação web para explorar e aprender mais sobre os Pokémons, utilizando JSON Server. Este projeto foi desenvolvido com React, estilizado com TailwindCSS e utiliza JavaScript para sua lógica principal.

## Funcionalidades
    📖 Detalhes do Pokémon: Exibição de informações detalhadas, como tipo, habilidades e estatísticas.
    📜 Lista de Pokémon: Navegue por uma lista de todos os Pokémons disponíveis.
    📱 Design Responsivo: Totalmente otimizado para dispositivos móveis e desktops.
    🛠️ CRUD de Pokémon: Crie, leia, atualize e exclua Pokémons diretamente na aplicação.

## Tecnologias Utilizadas
`React`
`TailwindCSS`
`JavaScript`
`JSON Server`

## Pré-requisitos
#### Certifique-se de ter instalado:
    Node.js (versão 16 ou superior)

## Como Executar o Projeto
#### Clone o repositório:
```bash
    git clone https://github.com/llorenzocardoso/pokedex
    cd pokedex
```

## Instale as dependências:
```bash
    npm install 
    ou
    npm i
```

## Adicionando Mais Pokémon à Lista:
#### Se você deseja adicionar mais Pokémon à lista, siga os passos abaixo:
    1. Abra o arquivo populateDb.js.
    2. Localize a linha que contém a constante pokemonIds.
    3. Altere a definição de pokemonIds para incluir os IDs dos Pokémon que você deseja adicionar.

    Por exemplo, para adicionar até o ID 300, substitua a linha original por:

```javascript 
const pokemonIds = Array.from({ length: 300 }, (_, index) => index + 1);
```

