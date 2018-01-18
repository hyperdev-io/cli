const Table = require('cli-table');
const gql = require('graphql-tag')

const instancesQuery = gql`
  {instances {
    id
    name
    app {name, version}
    storageBucket
    startedBy
    state
    desiredState
    status
    services {
      name
      fqdn
      ip
      state
      errors
      logs{n1000}
      container{id, name, created, node}
      ports
    }
  }}
`

const v = (val) => val ? val : ''

module.exports = ({ apolloClient, tableStyle }) => function (args, callback) {
    apolloClient.query({ query: instancesQuery })
        .then(res => {
            const table = new Table(Object.assign({ head: ['ID', 'NAME', 'APP', 'STORAGE BUCKET', 'STATE', 'DESIREDSTATE', 'STATUS', 'SERVICES'] }, tableStyle))
            for (inst of res.data.instances) {
                table.push([inst.id, inst.name, `${inst.app.name}:${inst.app.version}`, v(inst.storageBucket), v(inst.state), v(inst.desiredState), v(inst.status), inst.services.length])
            }
            this.log(table.toString())
            callback()
        })
        .catch(error => {
            this.log(error)
            callback()
        });
}