# Localização APP - Armazenamento local e controle de permissões

Aplicação mobile desenvolvida com **React Native** e **Expo**, que permite obter a localização atual do dispositivo, armazenar os registros localmente e personalizar a interface alternando entre os temas claro e escuro.

O projeto faz parte da **Atividade 3**, cujo objetivo é colocar em prática conceitos de armazenamento persistente e gerenciamento de permissões em aplicações móveis.

## Recursos

- **Obter localização atual:** usa a biblioteca `expo-location` para identificar as coordenadas geográficas do dispositivo com alta precisão.
- **Controle de acesso:** solicita ao usuário permissão para acessar a localização durante o uso do app. Se a autorização for recusada, uma mensagem de alerta é exibida.
- **Armazenamento do histórico:** registra cada localização obtida, incluindo identificador, latitude, longitude e data/hora da captura.
- **Consulta de registros:** exibe as localizações salvas em ordem decrescente de data, com coordenadas de seis casas decimais e data no padrão brasileiro.
- **Alternância de aparência:** um `Switch` alterna entre os modos claro e escuro e salva a escolha para os próximos acessos.

## Tecnologias

| Tecnologia     | Versão   | Finalidade                                              |
| -------------- | -------- | ------------------------------------------------------- |
| Expo           | ~58.0    | Ambiente de desenvolvimento e execução do aplicativo    |
| React Native   | 0.88.1   | Construção dos componentes e da interface mobile        |
| React          | 19.3.0   | Gerenciamento de componentes e estados                  |
| expo-location  | ~58.0    | Acesso à localização e gerenciamento de permissões      |
| AsyncStorage   | 2.2.0    | Armazenamento persistente das informações e configurações |

## Estrutura do projeto

```text
.
├── App.js
├── index.js
├── app.json
├── metro.config.js
├── package.json
└── src/
    ├── db/
    │   └── database.js
    ├── hooks/
    │   └── useLocation.js
    └── storage/
        └── theme.js
```

## Como funciona

### Obtenção e registro da localização

1. O usuário seleciona **Capturar localização** na tela principal.
2. `getCurrentLocation()` verifica e solicita a permissão de localização em primeiro plano.
3. Se a permissão for negada, o app mostra um alerta informando que não foi possível obter a localização.
4. Com a permissão concedida, o dispositivo fornece as coordenadas atuais usando `Accuracy.High`.
5. `insertLocation()` cria um novo registro e o grava no armazenamento local.
6. A localização recém-capturada aparece no topo do histórico.

### Armazenamento das informações

Para manter os dados disponíveis mesmo após fechar o app, é usado o **AsyncStorage**, que salva informações localmente no dispositivo. Duas chaves organizam os dados:

| Chave                    | Informação armazenada                                                  |
| ------------------------ | ---------------------------------------------------------------------- |
| `@myLocation:locations`  | Registros das localizações capturadas                                  |
| `@myLocation:theme`      | Tema escolhido pelo usuário (`true` para escuro, `false` para claro)   |

Exemplo de registro de localização:

```json
{
  "id": 1731250000000,
  "latitude": -28.677700,
  "longitude": -49.369700,
  "created_at": "2026-11-10T15:30:00.000Z"
}
```

### Recuperação dos dados ao iniciar

Sempre que o app é aberto, o `App.js` executa `initDatabase()` e `loadTheme()` dentro de um `useEffect`. Assim, o histórico de localizações e a preferência de tema são recuperados automaticamente, sem perder nada ao fechar o aplicativo.

## Como executar

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd Atividade3_Persistencia_de_dados_e_Permissoes
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o Expo:

   ```bash
   npx expo start
   ```

Depois de iniciar o servidor, use o QR Code para abrir o app no **Expo Go**, ou escolha uma das opções:

```bash
npm run android   # Executa no Android
npm run ios       # Executa no simulador iOS (macOS)
npm run web       # Versão para navegador
```

## Observações importantes

- É necessário permitir o acesso à localização para usar o recurso de captura.
- Os serviços de localização do dispositivo precisam estar ativados.
- Em emulador, pode ser preciso configurar manualmente uma localização simulada nas opções do ambiente virtual.

## Licença

Este projeto está sob a licença **MIT**. Para os termos de uso e distribuição, consulte o arquivo `LICENSE`.
