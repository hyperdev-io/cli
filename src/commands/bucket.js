const Table = require('cli-table2');

module.exports = ({ client, tableStyle }) => (vorpal, options) => {
    vorpal.command('bucket ls', 'List data buckets.').action(function (args, callback) {
        client.buckets.list().then(buckets => {
            const table = new Table(Object.assign({ head: ['ID', 'NAME', 'LOCKED']}, tableStyle))
            for (bucket of buckets) {
                table.push([bucket.id, bucket.name, bucket.isLocked])
            }
            this.log(table.toString())
            callback()
        }).catch(error => {
            this.log(error.graphQLErrors[0].message)
            callback()
        })
    })
    vorpal.command('bucket rm <name>', 'Remove bucket.').action(function (args, callback) {
        client.buckets.remove(args.name).then(bucket => {
            this.log(bucket)
        }).catch(error => {
            this.log(error.graphQLErrors[0].message)
            callback()
        })
    })
    vorpal.command('bucket cp <source> <destination>', 'Copy bucket.').action(function (args, callback) {
        client.buckets.copy(args.source, args.destination).then(bucket => {
            this.log(bucket.id)
        }).catch(error => {
            console.log(error);
            
            this.log(error.graphQLErrors[0].message)
            callback()
        })
    })
}
