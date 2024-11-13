# Board Game Development Kit

Welcome to my BGDK (Board Game Development Kit) & my personal Portfolio for browser web applications. Inside you will find a fully functioning foundation that you need to begin to develop a simple game, at an enterprise level. Everything is very modular and modifiable form so you can have creative independence in how you use the api & libraries. I chose to make my app using React; but any library or framework will pair easily. The structure is made with an NX MonoRepo to make reusability, security, scalability, and maintainability much easier. All you need to do is fork the repo and develop or contribute. The following sections will explain the technology and choices behind the BGDK. My portfolio is basically a summary of all the projects within. All are fully fuctional and can be used on [my personal website https://andrew-k.us](https://andrew-k.us) Thank you for coming by and enjoy.

## Language and Technologies

- Typescript
- Plain CSS
- Axios for all HTTP requests
- Vite for all testing
- Webpack for api bundler
- Vite for Apps and Libraries
- PostgreSQL for DB

## Structure of BGDK

- It is broken into 3 parts:

  - APIS
  - APPS
  - LIBS

  ### APIS:

  A simple Express app which gives the user the ability to create their own endpoints for each game while retaining the same structure and reusability. Some highlight features are:

  - Dynamic Endpoints.
  - Use of context object design pattern to encapsulate all necessary information inside each request and response to execute an action on the active game.
  - Actions are developed using commands to build a chain of responsibility for all given actions; then tying all individual chains together. This provides granular control of exactly how an action executes and very detailed and exact debugging if an action does fail unexpecetedly; as well as, decoupling of each request from specific games and the ability to centrally handle requests without having to redesign a new set of endpoints and actions for every single game developed.
  - Connections to Google Cloud Services (Storage, Vertex AI) for use in APPS.
  - Handles all query types for Gemini through Vertex AI API.

  ### APPS

  My app Chutes & Ladders is designed with React, React-Router, and MUI Material as the 3 principal libraries; additionally, Formik and Yup are used to handle client-side form validation. React-Router provides a client side browser router to minimize the number of calls to the api, while keeping the flow of the user experience fluid and consistent. Some highlight features are:

  - Reusable React components.
  - Browser Router to handle all client side routing, clean and easy URLs, and maintaining the UI in sync with the URL in the address bar.
  - MUI Material theme used to make the UI responsive to mobile, tablets, laptop, and Desktop devices; as well as, making application level changes to visual design much easier by having the majority of visual design choices tied to a MUI Material component.
  - Local Model provides the interface to query Ollama models locally and RAG train your locally hosted model.
  - Portfolio is a "summary" of all other projects where I provide the ability to test each app and api in one React App. I left out the local model because I didnt want the cloud bill for hosting this app to be unreasonable for a developer portfolio

  ### LIBS (libraries)

  The libraries provided are sufficient to generate any board style game. Each are as follows:

  - Chain, which holds all classes for Context, Command, and Chain (CoR) objects.

  - Chains-For-Games, which holds all individual chains associated with each action taken on the active game.

  - Chutes-and-Ladders, which holds all business logic and rules specific to an instance of Chutes & Ladders

  - Game, which holds generic game class where all instances of a specific game live; in addition to, game specific properties, such as: active players array, ready to start flag, game won flag, etc.

  - Game-Types, which holds all types, interfaces, and enums for other libs and apps.

  - Models, which holds all data structures and builder classes to build a game for the api, map active games, and de-referencing utilities for context object along with other game functionality. The maps of game instances and active games is where any metrics you would like to track should be implemented.
