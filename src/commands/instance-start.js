const Table = require('cli-table');
const gql = require('graphql-tag')

const startInstance = gql`
  mutation startInstance($name: String!, $appName: String!, $appVersion: String!, $parameters: JSON, $options: Options) {startInstance(
    name: $name
    appName: $appName
    appVersion: $appVersion
    parameters: $parameters
    options: $options
  ){
    id
  }}
`

const v = (val) => val ? val : ''

module.exports = ({ apolloClient, tableStyle }) => function (args, callback) {
    const appName = args.app.split(':')[0]
    const appVersion = args.app.split(':')[1]
    const variables = {
        name: args.name,
        appName: appName,
        appVersion: appVersion,
    }
    const cb = (res) => {
        this.log(res.data.startInstance.id)
        callback()
    }
    const errorCb = (error) => {
        this.log(error.graphQLErrors[0].message)
    }
    apolloClient.mutate({ mutation: startInstance, variables }).then(cb).catch(errorCb)
}