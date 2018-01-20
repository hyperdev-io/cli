const { appsQuery } = require('./queries')
const { removeApp } = require('./mutations')

module.exports = apolloClient => ({
    list: () => new Promise((resolve, reject) => {
        apolloClient.query({ query: appsQuery })
            .then(res => resolve(res.data.apps))
            .catch(error => rject(error));
    }),
    remove: (name, version) => new Promise((resolve, reject) => {
        const variables = { name, version }
        apolloClient.mutate({ mutation: removeApp, variables })
            .then(res => resolve(res.data.removeApp))
            .catch(reject)
    }),
})