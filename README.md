# Clicker-App-Server
React Clicker Server:
[![CircleCI](https://circleci.com/gh/SLO42/Clicker-App-Server/tree/server.svg?style=svg)](https://circleci.com/gh/SLO42/Clicker-App-Server/tree/server)

## Docker startup: 
``` npm run docker-up ```
	In a separate window/tab run 
``` npm run dev ```
	Then go to localhost:4242/api-docs.
	Under the `database` tab run the post route with 
	apiKey set to either the default: "basicAuth" or ``process.env.SEED_KEY``.

TL:DR: you need .env variables: so here is an example:
<details>
	<summary > This is the summary text, click me to expand </summary>
>    API_VERSION="v1"
>    VERSION="0.1.0"
>    JWT_SECRET="CoolSecret"
>    GOOGLE_CLIENT_ID="0000000000-string.apps.googleusercontent.com"
>    GOOGLE_CLIENT_SECRET="secret-passcode"
>    SITEURL="http://localhost:3000"
>    PORT=4242
>    API_URL=http://localhost:4242
</details>