const gql = require('graphql-tag')

module.exports = {
    startInstance: gql`
        mutation startInstance($name: String!, $appName: String!, $appVersion: String!, $parameters: JSON, $options: Options) {startInstance(
            name: $name
            appName: $appName
            appVersion: $appVersion
            parameters: $parameters
            options: $options
        ){
            id
        }}
    `,
    stopInstance: gql`
        mutation stopInstance($name: String!){
            stopInstance(name: $name) {
                id, name
            }
        }
    `,
    removeApp: gql`
        mutation removeApp(
            $name: String!,
            $version: String!
        ) {removeApp(name:$name, version:$version)}
    `,
}