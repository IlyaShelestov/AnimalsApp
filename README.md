# WeatherApp

This project serves as the second assignment for the **WEB Technologies 2** course at **Astana IT University**.

## Dependencies

1. Express (https://www.npmjs.com/package/express);
2. Embedded JavaScript templates(EJS) (https://www.npmjs.com/package/ejs);

## Used APIs

1. OpenWeatherMap API (https://openweathermap.org/api);
2. TheCatAPI (https://developers.thecatapi.com/);
3. meowfacts (https://github.com/wh-iterabb-it/meowfacts);

## Before Installation

Before installing this application, ensure that you have **GitBash**, **Node.js**, and **Node Package Manager(npm)** installed on your machine.

## Installation 

1. Create a *folder* where you want to install this project.
2. Open the created *folder* with **GitBash**.
3. Use the following commands in **GitBash** to download the project:
```
git clone https://github.com/ilyaShelestov/WeatherApp
cd WeatherApp
```
4. Install all dependencies:
```
npm install
```
4. Start the server with:
```
npm start
```
5. The server runs on **port 3000**. Open the project in your browser by navigating to **localhost:3000**.

After completing these steps, you will land on the **Home Page**.

To view the project, navigate to the *"Weather"/"Cats"* tabs, or visit **localhost:3000/weather**/**localhost:3000/cats**.

## Additional Information

This web project is designed using **Bootstrap** for a responsive and user-friendly layout. It comprises three main sections: the **"Home"** page providing an overview of the project, the **"Cats"** page featuring two APIs for generating random cat photos and facts, and the **"Weather"** page where users can retrieve weather information for any city using the OpenWeatherAPI.

The application utilizes three APIs: **OpenWeatherMap** for weather data, **TheCatAPI** for random cat photos, and **meowfacts** for interesting cat facts. These APIs are integrated to enhance the user experience by providing dynamic content.

The backend is built with **Express**, and **EJS** is used for templating, ensuring efficient server-side rendering and a seamless interaction for users.