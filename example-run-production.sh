#!/bin/bash

# For production

export SMTP_USER='XXXXX'
export SMTP_PASS='XXXXX'
export NODE_ENV='production'
export SEND_EMAIL='true'

nohup npm start &
