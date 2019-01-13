Chatty App
=====================

Chatty allows users to communicate with each other without having to register accounts. It uses React as well as modern tools for Node including Webpack and Babel.

## Final Product

On connection:
![On connection](https://github.com/LuckyLusik/ChattyApp/blob/master/docs/screen1.png)

This application has real-time functionality where the user does not have to reload the page in order to see updates. Header displays the count of connected users. When the number of connected users changes, this count will be updated for all connected users. When the user sends a chat message, all connected users receive and display the message. Different users' names will each be coloured differently.
![On connection](https://github.com/LuckyLusik/ChattyApp/blob/master/docs/screen2.png)

If the user changes their name, all connected users are notified of the name change. In order to change the name the user needs to type new name and press ENTER. If the user leaves the name field empty he will be displayed under "Anonymous".
![On connection](https://github.com/LuckyLusik/ChattyApp/blob/master/docs/screen3.png)

## Dependencies

* express
* ws
* uuid
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom

## Getting started

- Install all dependencies (using the "npm install" command).
- Run the development web server using the "npm start" command.
