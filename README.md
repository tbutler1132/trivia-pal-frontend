Live Demo:
    https://blissful-thompson-f85926.netlify.app
 
 TriviaPal is an application that allows users to take quizzes and save their results. A user select a topic, diffuclty, and the number of questions.

To run project locally on Mac:

Clone both the backend and frontend repos

cd into trivia-pal-backend

If you do not have rbenv installed, install it
  
    check if you have rbenv: $ rbenv -v

    Install rbenv: $ brew install rbenv

Install ruby 3.0.2

    $ rbenv install 3.0.2

Run bundle install to install required gems

    $ bundle install

Setup the database

    $ bundle e rails db:setup
    $ bundle e rails db:migrate

Install PostgresSQL if it is not already

    check if it installed: $ postgres -v
    Install via Homebrew: $ brew install postgresSQL
    Start the service: $ brew services start postgresql

Run the rails server

    $ bundle e rails s

cd into trivia-pal-frontend

    $ npm install
    $ npm start
