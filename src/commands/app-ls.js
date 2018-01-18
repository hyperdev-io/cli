const Table = require('cli-table');
const gql = require('graphql-tag')

const appsQuery = gql`
  {apps {
    id
    name
    version
    dockerCompose
    bigboatCompose
    tags
  }}
`
module.exports = ({ apolloClient, tableStyle}) => function (args, callback) {
    apolloClient.query({ query: appsQuery })
        .then(res => {
            const table = new Table(Object.assign({ head: ['ID', 'NAME', 'VERSION', 'TAGS'] }, tableStyle))
            for (app of res.data.apps) {
                table.push([app.id, app.name, app.version, app.tags ? app.tags.join(',') : ''])
            }
            this.log(table.toString())
            callback()
        })
        .catch(error => {
            this.log(error)
            callback()
        });
}