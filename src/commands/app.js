const Table = require('cli-table2');

module.exports = ({ client, tableStyle }) => (vorpal, options) => {
    vorpal.command('app ls', 'List Applications').action(function (args, callback) {
        client.apps().then(apps => {
                const table = new Table(Object.assign({ head: ['ID', 'NAME', 'VERSION', 'TAGS'] }, tableStyle))
                for (app of apps) {
                    table.push([app.id, app.name, app.version, app.tags ? app.tags.join(',') : ''])
                }
                this.log(table.toString())
                callback()
            })
            .catch(error => {
                this.log(error)
                callback()
            });
    })
}
