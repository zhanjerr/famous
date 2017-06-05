const knex = require("knex");
const settings = require("./settings"); // settings.json
const target = process.argv[2];

const client = new knex.Client({
  user     : settings.user,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.
    client.end();
  });
