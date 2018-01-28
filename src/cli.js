#!/usr/bin/env node

if (!process.env.BIGBOAT_API) {
  console.log("Environment variable BIGBOAT_API not set.");
  process.exit(1);
}

const client = require("@bigboat/server-client").client(process.env.BIGBOAT_API);
const BigBoatVorpal = require('./bigboat-vorpal')
const vorpal = BigBoatVorpal(client);

if (process.argv.length > 2) {
  // non interactive
  vorpal.exec(process.argv.slice(2).join(" "));
} else {
  // interactive
  vorpal.log(`Connected to ${process.env.BIGBOAT_API}`);
  vorpal.delimiter("BigBoat CLI />");
  vorpal.show().parse(process.argv);
}
