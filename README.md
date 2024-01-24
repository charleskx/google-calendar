
# Google Calendar integration project using Fastify

This sample project demonstrates a practical integration with Google Calendar using Node.js and the Fastify framework. The application allows you to perform basic operations such as creating, reading, updating and deleting events in Google Calendar.


## Technologies used

**Node.js:** JavaScript execution environment for the backend.

**Fastify:** Lightweight and efficient web framework for building APIs.

**Zod:** Library for validating data schemas.

**Date-fns:** Library for manipulating dates in JavaScript.

**Googleapis:** Official Google library for integration with its APIs.

**UUID:** Library for generating unique identifiers.
## Project configuration

#### Installing dependencies

Make sure you have Node.js and npm installed on your system. Run the following command to install the project's dependencies:

```
npm install
```

#### Setting up Google Calendar credentials

Before running the application, you need to configure the Google Calendar API credentials. Follow the steps below:

1. Creating a Project in Google Developer Console
    - Go to the [Google Developer Console](https://console.cloud.google.com).
    - Create a new project and give it a meaningful name.
2. Enabling the Google Calendar API
    - In the Developer Console, go to the "Library" section.
    - Search for and select "Google Calendar API".
    - Click on the "Activate" button.
3. Creating API credentials
    - In the Developer Console, go to the "Credentials" section.
    - Click on "Create credentials" and choose "OAuth client ID".
    - Configure OAuth consent and fill in the necessary details.
    - Select the appropriate application type (e.g. Web Application).
    - Provide the appropriate redirection URIs.
    - Download the JSON credentials and save them in the credentials.json file in the project directory.

#### Executing the Project

With the dependencies installed and the credentials configured, you can run the application using the following command:

```
npm run start:dev
```

The application will be available at http://localhost:3333.

## Environmental variables

Before running this project, you will need to add the following environment variables to your `.env`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`GOOGLE_API_KEY`

All the necessary variables are in `.env.example`


## Using the API

#### Login with Google

```http
  GET /google/sessions
```

#### Create event in calendar

```http
  POST /google/schedule_event
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `summary` | `string` | **Required**. Event title |
| `description` | `string` | **Required**. A brief description of the event |
| `attendees` | `array` | **Required**. An object array containing the `email` key |

#### Remove an event from the calendar

```http
  DELETE /google/{id}/delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. The ID of the event to be removed |



## Feedback

If you have any feedback, suggestions or criticisms, please let us know at charleston.silva03@gmail.com.


## Licença

[MIT](https://choosealicense.com/licenses/mit/)

