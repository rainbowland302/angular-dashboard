## Angular Dashboard Demo
This repo uses [Angular Starter kit](https://github.com/AngularClass/angular-starter) as start up.

## Requirements

* node `^6.6.0` ( windows >= `6.9.0` using inspect for debug )
* npm `^3.10.3`

## Getting Started
0. Copy your excel file into `\angular-dashboard\server\assets\`
1. npm install -g node-pre-gyp ( windows only )
2. npm i
3. npm run build:prod ( build static bundle files for server ) 
4. npm run server:node ( start a node server for production ) go to http://${your_ip}:3005
5. npm start ( start a dev server for debug front end code) go to http://localhost:3000
6. npm run server:node:inpect ( start a node server for debug back end code )