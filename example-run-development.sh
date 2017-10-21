#!/bin/bash

# For development, get an https://ethereal.email account and enter the details:

export SMTP_USER='XXXXXX'
export SMTP_PASS='XXXXXX'


export NODE_ENV='development'
export SEND_EMAIL='true'

nodemon ./app.js

