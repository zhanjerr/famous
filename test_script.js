const pg = require("pg");
const settings = require("./settings"); // settings.json
const target = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  database : settings.database,
  host     : settings.hostname,
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT id, first_name, last_name, to_char(birthdate, 'YYYY-MM-DD') AS birthdate FROM famous_people WHERE last_name = $1;", [target], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log( `Searching....\nFound ${result.rowCount} person(s) by the name \'${target}\':`);
    console.log(`-   ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born \'${result.rows[0].birthdate}\'`);
      // result.rows[0].number`); //output: 1
    client.end();
  });
});