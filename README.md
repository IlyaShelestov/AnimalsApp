# APIApp

This project serves as the fourth assignment for the **WEB Technologies 2** course at **Astana IT University**.

## Description

This web project is designed using **Bootstrap** for a responsive and user-friendly layout. It comprises *seven* main sections: the **"Home"** page providing an overview of the project; the **"Blog"** page provides items with specific information (posts), including carousel with 3 images; the **"Cats"** page featuring two APIs for generating random cat photos and facts; the **"Weather"** page where users can retrieve weather information for any city using the OpenWeatherAPI; the **"Dogs"** page for generating random dog photos; and the **"Profile"** page, which displays the user's search history across all APIs. Additionally, after successful **login** or **sign-up**, users gain access to these functionalities, with an extra **"Admin"** tab available to users logged in as admins, offering insights into all *users' account information*, actions like *Delete*, *Restore*, *Update*, *Insert*, and histories of *all users' searches* across the APIs. Additionally, the **"Admin"** tab allows for the management of the **"Blog"** page, encompassing actions such as *Delete*, *Restore*, *Update*, *Insert*, and displaying a list of all items.

The application utilizes four APIs: **OpenWeatherMap** for weather data, **TheCatAPI** for random cat photos, and **meowfacts** for interesting cat facts, and **RandomDog** for retrieving random dog photos. These APIs are integrated to enhance the user experience by providing dynamic content.

The backend is built with **Express**, and **EJS** is used for templating, ensuring efficient server-side rendering and a seamless interaction for users. **Mongoose** is integrated for easy data management with **MongoDB**, streamlining API development and data saving processes. For user session management, **Cookie-Parser** is employed to handle cookies efficiently, essential for maintaining logged-in user information. Moreover, **Bcrypt** is utilized to safeguard users' passwords.

The project also supports two languages: *Russian* and *English*. Almost all pages except "Admin" and "Weather" are translated.

## Dependencies

1. Express (https://www.npmjs.com/package/express);
2. Embedded JavaScript templates(EJS) (https://www.npmjs.com/package/ejs);
3. Mongoose (https://www.npmjs.com/package/mongoose);
4. Cookie-Parser (https://www.npmjs.com/package/cookie-parser);
5. Bcrypt (https://www.npmjs.com/package/bcrypt);

## Used APIs

1. OpenWeatherMap API (https://openweathermap.org/api);
2. TheCatAPI (https://developers.thecatapi.com/);
3. meowfacts (https://github.com/wh-iterabb-it/meowfacts);
4. RandomDog (https://random.dog/woof.json);

## Project Structure Overview

Frontend Directory (`./frontend/`):

The frontend directory houses all essential components required for the user interface of the application. It is organized into several subdirectories:

* **Views** (`./frontend/views/`): Contains EJS templates for rendering dynamic content on the web pages.
* **CSS** (`./frontend/public/css/`): Holds the Cascading Style Sheets (CSS) files for styling the web pages.
* **Images** (`./frontend/public/images/`): Holds the images for the web pages.
* **Partials** (`./frontend/views/partials/`): Includes reusable EJS partials for efficient template management.

Backend Directory (`./backend/`):

The backend directory forms the core of the application's server-side logic. It is composed of multiple components, each serving a specific purpose:

* **Controllers** (`./backend/controllers/`): This directory contains controller functions that interface with various APIs to fetch data. These controllers process the data and pass it to the routes for further handling.
* **Database** (`./backend/database/`): Includes functions dedicated to managing interactions between the routes and MongoDB Atlas collections. These functions facilitate data retrieval and updates to and from the database.
* **Routes** (`./backend/routes/`): Houses route handlers responsible for managing the application's endpoints. These handlers process incoming requests and, based on the defined routes, delegate tasks to the appropriate controllers or respond directly to the client.
* **Main Application File** (`./backend/app.js`): The entry point for starting the application. This file initializes and configures the application server.
* **Configuration** (`./backend/config.js`): Contains all necessary configurations for the application, such as database connection strings, API keys, and other environment-specific settings.
* **Helpers** (`./backend/helpers.js`): Provides auxiliary functions that support the interaction between different parts of the application, enhancing modularity and reusability.
* **Middleware** (`./backend/middleware.js`): Consists of middleware functions that execute during the request-response cycle.

This structure ensures a clear separation of concerns, facilitating maintenance and scalability of the application.

## Before Installation

Before installing this application, ensure that you have **GitBash**, **Node.js**, and **Node Package Manager(npm)** installed on your machine.

## Installation 

1. Create a *folder* where you want to install this project.
2. Open the created *folder* with **GitBash**.
3. Use the following commands in **GitBash** to download the project:
```
git clone https://github.com/ilyaShelestov/AnimalsApp
cd AnimalsApp
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

To view the project, navigate to the *"Login"* tab, or visit **localhost:3000/login** / **localhost:3000/signup**.

After logging in, you can navigate to *"Blog"*(**localhost:3000/blog**) tab for view all posts(items).

You can visit **localhost:3000/admin/blog** for perform actions with items. (You can find it by pressing *"Open Blog control panel"* button in *"Admin"* tab).

### You can log in as an **admin** with the following credentials:

**Username**: ilya
**Password**: admin

### Or you can log in as a **regular user** with the following credentials:

**Username**: mike
**Password**: 123321
