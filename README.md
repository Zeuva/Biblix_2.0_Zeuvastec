# 📜 BIBLIX Trivia

Jogo de perguntas e respostas bíblicas, em português, com modo **Solo** e **Multiplayer em tempo real**.

🔗 Deploy: _adicione aqui o link do Vercel depois de publicar_

## Sobre

- **143 perguntas** organizadas em **14 cartões temáticos** (C001 a C016)
- Modo **Solo**: jogue no seu ritmo, com progresso e pontuação ao vivo
- Modo **Multiplayer**: crie uma sala, compartilhe o código com amigos e joguem juntos com placar em tempo real
- Som e efeitos visuais: feedback sonoro de acerto/erro, animações nas respostas, confete ao concluir um cartão
- Instalável como app (PWA) — funciona offline no modo Solo depois do primeiro carregamento

## Estrutura do projeto

```
index.html          Página principal
style.css            Todo o visual do jogo
questions.js         Banco de perguntas (não editar sem necessidade)
app.js                Áudio, confete, funções utilitárias
main.js               Estado global, roteamento de telas, tela inicial
solo.js                Lógica do modo Solo
multiplayer.js         Lógica de rede do modo Multiplayer (PeerJS)
multiplayer-ui.js      Telas do modo Multiplayer
manifest.json          Configuração do PWA
service-worker.js      Cache offline
vercel.json             Configuração de deploy na Vercel
icon-192.png / icon-512.png   Ícones do app
```

## Como publicar

Este projeto é 100% estático (sem servidor, sem build) — pode ser publicado direto na [Vercel](https://vercel.com) ou [Netlify](https://netlify.com):

1. Suba todos os arquivos deste repositório (sem alterar a estrutura de pastas)
2. Na Vercel: **Add New → Project → Import Git Repository** → selecione este repositório → Deploy
3. Pronto — o link gerado já é o jogo funcionando

## Multiplayer

O modo multiplayer usa [PeerJS](https://peerjs.com) para conectar os jogadores diretamente (peer-to-peer), sem precisar de um servidor próprio. Funciona melhor com internet estável; se a conexão falhar, o jogo mostra uma mensagem clara em vez de travar.

## Conteúdo

As perguntas em `questions.js` são as mesmas do banco original do projeto — não devem ser alteradas sem revisão, para preservar a fidelidade do conteúdo.

---

Feito com ❤ para estudo e diversão em família.
