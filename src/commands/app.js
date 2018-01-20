const Table = require('cli-table2');

module.exports = ({ client, tableStyle }) => (vorpal, options) => {
    vorpal.command('app ls', 'List Applications').action(function (args, callback) {
        client.apps.list().then(apps => {
                const table = new Table(Object.assign({ head: ['ID', 'NAME', 'VERSION', 'TAGS'] }, tableStyle))
                for (app of apps) {
                    table.push([app.id, app.name, app.version, app.tags ? app.tags.join(',') : ''])
                }
                this.log(table.toString())
                callback()
            })
            .catch(error => {
                this.log(error.graphQLErrors[0].message)
                callback()
            });
    })
    vorpal.command('app rm <name:version>', 'Remove an application').action(function(args, callback) {
        const appName = args['name:version'].split(':')[0]
        const appVersion = args['name:version'].split(':')[1]
        client.apps.remove(appName, appVersion).then(app => {
            this.log(app)
            callback()
        }).catch(error => {
            this.log(error.graphQLErrors[0].message)
            callback()
        });
    })
}
