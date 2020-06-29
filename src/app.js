'use strict';

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const requestPromise = require('request-promise-native');
// const {Firestore} = require('jovo-db-firestore');

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb(),
  // new Firestore().
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.toIntent('JokeIntent');
  },

  async JokeIntent() {
    const joke = await getJoke();

    this.tell(joke);
  },

});

async function getJoke() {
  const options = {
    uri: 'https://us-central1-jokeapp2020.cloudfunctions.net/joke',
    json: true // Automatically parses the JSON string in the response
};
  const joke = await requestPromise(options);
  console.log(joke)

  return joke;
}


module.exports = { app };
