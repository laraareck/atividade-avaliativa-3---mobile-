# A loc APP — Persistência de dados e permissões

Aplicativo mobile feito com **React Native** e **Expo** que captura a localização atual do dispositivo, salva cada captura localmente e permite alternar entre tema claro e escuro, mantendo tudo salvo mesmo depois de fechar o app.

Projeto desenvolvido como **Atividade 3** para praticar persistência de dados e gerenciamento de permissões em soluções mobile.

## Funcionalidades

- **Captura de localização:** obtém latitude e longitude atuais com `expo-location`, usando alta precisão.
- **Solicitação de permissão:** pede autorização de localização em primeiro plano no momento da captura e exibe um alerta caso o usuário negue.
- **Histórico persistente:** cada captura é salva com `id`, coordenadas e data/hora, e o histórico é recarregado automaticamente quando o app abre.
- **Listagem:** exibe as localizações salvas, da mais recente para a mais antiga, com latitude e longitude (6 casas decimais) e data no formato `pt-BR`.
- **Dark mode:** um `Switch` alterna o tema e a preferência é lembrada entre sessões.

## Tecnologias

| Tecnologia | Versão | Uso |
| --- | --- | --- |
| [Expo](https://expo.dev/) | ~58.0 | Plataforma e ferramentas de desenvolvimento |
| [React Native](https://reactnative.dev/) | 0.88.1 | Interface mobile |
| [React](https://react.dev/) | 19.3.0 | Componentes e estado |
| [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) | ~58.0 | Permissão e leitura da localização |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | 2.2.0 | Persistência local (localizações e tema) |

## Estrutura do projeto

```
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

### Fluxo de captura

1. O usuário toca em **Capturar localização**.
2. `getCurrentLocation()` solicita a permissão de localização em primeiro plano. Se não for concedida, lança o erro `Permissão de localização negada.`, exibido em um `Alert`.
3. Com a permissão concedida, lê a posição atual com `Accuracy.High` e devolve `{ latitude, longitude }`.
4. `insertLocation()` cria o registro e o grava no armazenamento local.
5. O novo registro é inserido no topo da lista na interface.

### Persistência

Os dados são salvos no **AsyncStorage**, em formato JSON, sob duas chaves:

| Chave | Conteúdo |
| --- | --- |
| `@myLocation:locations` | Lista de localizações capturadas |
| `@myLocation:theme` | Preferência de tema (`true` para escuro, `false` para claro) |

Cada localização salva tem este formato:

```json
{
  "id": 1731250000000,
  "latitude": -28.677700,
  "longitude": -49.369700,
  "created_at": "2026-11-10T15:30:00.000Z"
}
```

Ao iniciar, o `App.js` chama `initDatabase()` e `loadTheme()` dentro de um `useEffect`, restaurando o histórico e o tema salvos.

## Instalação e execução

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd Atividade3_Persistencia_de_dados_e_Permissoes

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npx expo start
```

Depois, escaneie o QR Code com o Expo Go ou use os atalhos do terminal:

```bash
npm run android   # abre no emulador/dispositivo Android
npm run ios       # abre no simulador iOS (somente macOS)
npm run web       # abre no navegador
```

> **Importante:** a captura depende da permissão concedida pelo usuário e dos serviços de localização ativos no dispositivo. Em emuladores, defina uma localização simulada nas configurações do próprio emulador.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE).