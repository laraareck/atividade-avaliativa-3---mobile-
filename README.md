Localização APP — Armazenamento local e controle de permissões
Aplicação mobile desenvolvida com React Native e Expo, que permite obter a localização atual do dispositivo, armazenar os registros localmente e personalizar a interface por meio da alternância entre os temas claro e escuro.

O projeto faz parte da Atividade 3, cujo objetivo é colocar em prática conceitos de armazenamento persistente e gerenciamento de permissões em aplicações móveis.

Recursos disponíveis
Obter localização atual: utiliza a biblioteca expo-location para identificar as coordenadas geográficas do dispositivo com alta precisão.
Controle de acesso: solicita ao usuário permissão para acessar a localização durante o uso do aplicativo. Caso a autorização seja recusada, uma mensagem de alerta é apresentada.
Armazenamento do histórico: registra cada localização obtida, incluindo identificador, latitude, longitude e data e horário da captura.
Consulta de registros: apresenta as localizações armazenadas em ordem decrescente de data, mostrando as coordenadas com seis casas decimais e a data formatada conforme o padrão brasileiro.
Alternância de aparência: disponibiliza um controle Switch para modificar entre os modos claro e escuro, salvando a escolha para os próximos acessos.
Ferramentas e bibliotecas utilizadas

Tecnologia	Versão	Finalidade
Expo	~58.0	Ambiente de desenvolvimento e execução do aplicativo
React Native	0.88.1	Construção dos componentes e da interface mobile
React	19.3.0	Gerenciamento de componentes e estados
expo-location	~58.0	Acesso à localização e gerenciamento de permissões
AsyncStorage	2.2.0	Armazenamento persistente das informações e configurações
Organização dos arquivos
A aplicação está dividida em arquivos responsáveis pela interface, configuração, acesso à localização e armazenamento dos dados:


text
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
Funcionamento da aplicação
Obtenção e registro da localização
O processo de captura segue estas etapas:

O usuário seleciona a opção Capturar localização na tela principal.
O método getCurrentLocation() verifica e solicita a autorização necessária para acessar a localização em primeiro plano.
Caso a permissão seja negada, o aplicativo apresenta um alerta informando que não foi possível obter a localização.
Após a autorização, o dispositivo fornece as coordenadas atuais utilizando a configuração Accuracy.High.
A função insertLocation() gera um novo registro com as informações obtidas e realiza sua gravação no armazenamento local.
A localização recém-capturada passa a ser exibida no início do histórico.
Armazenamento das informações
Para manter os dados disponíveis mesmo após o encerramento do aplicativo, foi utilizado o AsyncStorage, que permite salvar informações localmente no dispositivo.

São utilizadas duas chaves para organizar os dados:


Identificador	Informação armazenada
@myLocation:locations	Registros das localizações capturadas
@myLocation:theme	Configuração visual selecionada pelo usuário (true para escuro e false para claro)
Os registros de localização seguem uma estrutura semelhante ao exemplo abaixo:


json
{
  "id": 1731250000000,
  "latitude": -28.677700,
  "longitude": -49.369700,
  "created_at": "2026-11-10T15:30:00.000Z"
}
Recuperação dos dados ao iniciar
Sempre que o aplicativo é aberto, o arquivo App.js executa as funções initDatabase() e loadTheme() por meio de um useEffect.

Esse processo permite recuperar automaticamente o histórico de localizações e a preferência de tema anteriormente selecionada, evitando que essas informações sejam perdidas ao fechar o aplicativo.

Configuração do ambiente
Para executar o projeto localmente, siga as instruções abaixo:

1. Baixe o repositório:


bash
git clone <url-do-repositorio>
2. Acesse a pasta do projeto:


bash
cd Atividade3_Persistencia_de_dados_e_Permissoes
3. Instale os pacotes necessários:


bash
npm install
4. Inicialize o Expo:


bash
npx expo start
Após iniciar o servidor, utilize o QR Code disponibilizado para abrir a aplicação pelo Expo Go ou escolha uma das opções de execução:


bash
npm run android   # Executa no Android
npm run ios       # Executa no simulador iOS (macOS)
npm run web       # Disponibiliza a versão para navegador
Observações importantes
É necessário permitir o acesso à localização para utilizar o recurso de captura.
Os serviços de localização do dispositivo precisam estar ativados.
Ao utilizar um emulador, pode ser necessário configurar manualmente uma localização simulada nas opções do ambiente virtual.
Licença
Este projeto está disponibilizado sob a licença MIT. Para consultar os termos de utilização e distribuição, acesse o arquivo LICENSE.
