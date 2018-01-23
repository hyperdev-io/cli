const fs = require("fs");
const Table = require("cli-table2");

module.exports = ({ client, tableStyle }) => (vorpal, options) => {
  vorpal
    .command("app ls", "List applications.")
    .action(function(args, callback) {
      client.apps
        .list()
        .then(apps => {
          const table = new Table(
            Object.assign(
              { head: ["ID", "NAME", "VERSION", "TAGS"] },
              tableStyle
            )
          );
          for (app of apps) {
            table.push([
              app.id,
              app.name,
              app.version,
              app.tags ? app.tags.join(",") : ""
            ]);
          }
          this.log(table.toString());
          callback();
        })
        .catch(error => {
          this.log(error.graphQLErrors[0].message);
          callback();
        });
    });
  vorpal
    .command("app rm <name:version>", "Remove an application.")
    .action(function(args, callback) {
      const appName = args["name:version"].split(":")[0];
      const appVersion = args["name:version"].split(":")[1];
      client.apps
        .remove(appName, appVersion)
        .then(app => {
          this.log(app);
          callback();
        })
        .catch(error => {
          this.log(error.graphQLErrors[0].message);
          callback();
        });
    });
  vorpal
    .command(
      "app create <docker-compose-file> <bigboat-compose-file> <name:version>",
      "Create or update an application."
    )
    // .option("-d, --docker-compose <path>", "Path to the Docker Compose file.")
    // .option("-b, --bigboat-compose <path>", "Path to the BigBoat Compose file.")
    .action(function(args, callback) {
      const [appName, appVersion] = args["name:version"].split(":");
      const dockerComposeFile = args["docker-compose-file"];
      const bigboatComposeFile = args["bigboat-compose-file"];
      try {
        client.apps
          .createOrUpdate(
            appName,
            appVersion,
            fs.readFileSync(dockerComposeFile, { encoding: "utf8" }),
            fs.readFileSync(bigboatComposeFile, { encoding: "utf8" })
          )
          .then(app => {
            this.log(app);
            callback();
          })
          .catch(error => {
            this.log(error.graphQLErrors[0].message);
            callback();
          });
      } catch (error) {
        console.error(error.message);
      }
    });
};
