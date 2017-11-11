# README

# TriviaHub

Want to become the next Ken Jennings? TriviaHub is a site where you can create your own trivia games, play other user quizzes, and even try out real *Jeopardy!* questions, thanks to the [jService.io](http://jService.io) API!

[Check it out on Heroku!](https://trivia-hub.herokuapp.com)

# Technologies and Features

TriviaHub is built on Rails and features React.js functionality throughout, especially in the two different game modes. Each time you play "Classic Mode," clues are retrieved randomly from hundreds of different clues stored on jService.io, so each session is a unique game experience.

You can also show off your expertise to other users by creating custom quizzes using an intuitive interface.

The test suite uses RSpec for Rails model tests, Capybara and RSpec for Rails acceptance tests, and Jasmine/Enzyme for React components.

# Setup
After cloning down the repo, you will need to install Google OmniAuth2 in order to enable login. In your root folder, create a `.env` file and set your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` as environment variables.

Then run the following in your terminal:

Then run the following in your terminal:

```
$ bundle  
$ rake db:create
$ rake db:migrate
$ rails s
```

In a separate terminal tab, run:

```
$ npm install
$ npm start
```

Then navigate to localhost:3000 in your browser!

# Tests

* Rails tests are located in the `/spec` folder: run `rspec`.
* React tests are located in the `/react/test` folder: run `npm test`.

# Deployment

If you deploy to Heroku, make sure to include your Google OAuth keys as config vars in your project settings.

# Notes

This was my final project during my time at Launch Academy Boston. Thanks to everyone there!
