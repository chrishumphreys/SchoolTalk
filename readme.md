# SchoolTalk

This is the source for the prototype SchoolTalk.org.uk website.

SchoolTalk is a free to use website dedicated to helping parents and children to talk together about their school work. Visit http://schooltalk.org.uk

This is still very much WIP, but if you want to help contact me.

## Using

This is an Express.JS site with Handlebars view and hardcoded test service tier.

## To start in production:

sudo npm install

export NODE_ENV=production
npm start


## Dev mode

`npm install -g nodemon` (or install locally from package.json - `npm install`)
`nodemon ./app.js`

This should reload the node server on any file change in the project
