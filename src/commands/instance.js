const Table = require('cli-table2')
const colors = require('colors')

const v = (val) => val ? val : ''
const colorMap = {
    running: colors.green,
    failing: colors.red
}
const stateColor = (state) => colorMap[state] ? colorMap[state](state) : state

module.exports = ({ client, tableStyle }) => (vorpal, options) => {
    vorpal.command('instance ls', 'List Instances').action(function (args, callback) {
        client.instances.list().then(instances => {
            const table = new Table(Object.assign({ head: ['ID', 'NAME', 'APP', 'STORAGE BUCKET', 'STATE', 'SERVICES'] }, tableStyle))
            for (inst of instances) {
                table.push([inst.id, inst.name, `${inst.app.name}:${inst.app.version}`, v(inst.storageBucket), stateColor(v(inst.state)), inst.services.length])
            }
            this.log(table.toString())
            callback()
        }).catch(error => {
            this.log(error)
            callback()
        })
    })
    vorpal.command('instance start <name> <app>', 'Create a new instance based on an App').action(function (args, callback) {
        const appName = args.app.split(':')[0]
        const appVersion = args.app.split(':')[1]
        client.instances.start(args.name, appName, appVersion).then(instance => {
            this.log(instance.id)
            callback()
        }).catch(error => {
            this.log(error)
            callback()
        });
    })
    vorpal.command('instance stop <name>', 'Stop a running instance').action(function(args, cb){
        this.log('.....')
        cb()
    })
}
