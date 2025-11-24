## 💻 Guia de Comandos para Entusiastas de Tecnologia

Este projeto é uma **ferramenta Web interativa** e concebida para servir como um **Guia de Comandos (CLI)** e uma base de conhecimento para a comunidade de tecnologia. Seu objetivo é **desmistificar e facilitar o uso da interface de linha de comando** ("tela preta") por desenvolvedores, testadores e, principalmente, iniciantes.

O projeto foi desenvolvido com a aplicação dos conhecimentos obtidos na **Imersão Dev 10ª edição** e contou com o apoio da **API do Google Gemini** para a construção e enriquecimento da base de dados.

-----

### Funcionalidades

O Guia de Comandos oferece uma experiência completa de consulta e prática:

  * **Base de Conhecimento:** Contém **mais de 200 itens** de comandos comuns (Git, Shell, etc.).
  * **Busca Rápida e Eficiente:** Permite listar todos os comandos ou realizar **filtros de busca eficientes** para sanar dúvidas rapidamente.
  * **Documentação Detalhada em Modal:** Ao clicar em um card, um modal é aberto exibindo informações completas sobre o comando, incluindo:
      * Descrição e Uso Principal
      * Exemplos de Utilização
      * Tipo de Comando
      * Interface de Uso
      * Sistemas Operacionais Compatíveis (Linux, macOS ou Windows).
  * **Terminal de Teste (Simulador CMD):** Inclui um terminal simulado que permite ao usuário digitar comandos e **verificar a sintaxe correta** esperada (validação exata).

-----

### Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e recursos:

  * **HTML5:** Estrutura semântica e esqueleto da ferramenta.
  * **CSS3:** Estilização e responsividade.
  * **JavaScript:** Lógica de manipulação do DOM, carregamento assíncrono de dados, filtros dinâmicos e a funcionalidade interativa do simulador de terminal.
  * **JSON:** Utilizado para armazenar e consumir a base de dados de comandos (`data.json`) e os comandos simulados (`comandos_simulados.json`).
  * **API do Google Gemini:** Utilizada no processo de desenvolvimento para auxiliar na pesquisa e no povoamento das bases de dados, garantindo a riqueza e precisão das informações.

-----

### Estrutura do Projeto

A organização dos arquivos segue o padrão a seguir:

```
guia-de-comandos/
├── 📄 index.html                  # Arquivo principal
├── 🎨 style.css                   # Folha de estilos
├── ⚙️ script.js                   # Lógica de programação e interatividade (Filtros e CMD Teste)
├── 📦 data.json                   # Banco de dados principal com a documentação completa dos comandos
├── 📦 comandos_simulados.json     # Base de dados para o CMD Teste (entrada/resposta exata)
└── 🖼️ favicon.ico                 # Elemento visual
```
-----

### Preview

<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/78168b79-ff7f-44b8-bb89-daeb9185b635" />
<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/d027005a-f5d3-4e8c-a61d-deb7f7efb7d9" />
<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/6510c7db-2634-4aa1-9d6e-5b97e930f69d" />
<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/643ad283-bbe5-4e28-a982-89a09aa1fe33" />
<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/a84e8034-2026-4499-b638-f093b90c787d" />

-----

### Contato

Desenvolvido por: Laura Grando

LinkedIn: https://www.linkedin.com/in/lauraagrando/

Email: lauraagrando@gmail.com
