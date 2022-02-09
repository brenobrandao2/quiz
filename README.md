# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

- Depois de commitar novas implementações na branch master, acesse o servidor e atualize a branch master na pasta do projeto (/var/www/quiz-adm.lifeandmoney.com.br/project/quiz-adm/) com o comando 'git pull'.
- Em seguida, execute 'npm run build' ainda na pasta do projeto.
- Agora, copie o conteúdo da pasta build para a pasta html com o seguinte comando 'cp -a build/. /var/www/quiz-adm.lifeandmoney.com/html/'.
