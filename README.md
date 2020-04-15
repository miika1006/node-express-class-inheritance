# What?

a Node + Express -REST service with typescript using classes and inheritance.

# Getting started

1. Clone repo
2. run `npm install`
3. Add `.env` -file, with content `PORT=7000`
4. Invoke the webpack script to create the bundle: `npm run webpack`
5. Then in a separate terminal, start script to run the bundle: `npm start`

# Content

index.ts uses App class to create the express app and configure it.
Controllers are injected to App that will call configure() on them.
configure() contains all express route configurations for every controller.

There is a default implementation in BaseController. Default implementation uses generic Repository, that has simple CRUD functions to save and get data. This app uses in memory array to store and get data.
