const { appsQuery } = require('./queries')

module.exports = apolloClient => () => {
    return new Promise((resolve, reject) => {
        apolloClient.query({ query: appsQuery })
            .then(res => resolve(res.data.apps))
            .catch(error => rject(error));
    })
}