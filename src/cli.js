#!/usr/bin/env node

if (!process.env.HYPERDEV_HOST) {
  console.log("Environment variable HYPERDEV_HOST not set.");
  process.exit(1);
}
if (!process.env.HYPERDEV_TOKEN) {
  console.log("Environment variable HYPERDEV_TOKEN not set.");
  process.exit(1);
}

const hyperdevHost = process.env.HYPERDEV_HOST;
const token = process.env.HYPERDEV_TOKEN;


const client = require("@hyperdev-io/graphql-api-client").client(hyperdevHost, {
  token
});
const BigBoatVorpal = require('./hyperdev-vorpal')
const vorpal = BigBoatVorpal(client);

if (process.argv.length > 2) {
  // non interactive
  vorpal.exec(process.argv.slice(2).join(" "));
} else {
  // interactive
  vorpal.log(`Connected to ${hyperdevHost}`);
  vorpal.delimiter("HyperDev /> ");
  vorpal.show().parse(process.argv);
}
