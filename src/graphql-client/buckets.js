const { bucketsQuery } = require('./queries')
const { deleteBucket, copyBucket} = require('./mutations')

module.exports = apolloClient => ({
    list: () => new Promise((resolve, reject) => {
        apolloClient.query({ query: bucketsQuery })
            .then(res => resolve(res.data.buckets))
            .catch(reject);
    }),
    remove: name => new Promise((resolve, reject) => {
        const variables = { name }
        apolloClient.mutate({ mutation: deleteBucket, variables })
            .then(res => resolve(res.data.deleteBucket))
            .catch(reject)
    }),
    copy: (sourceName, destinationName) => new Promise((resolve, reject) => {
        const variables = { sourceName, destinationName }
        apolloClient.mutate({ mutation: copyBucket, variables })
            .then(res => resolve(res.data.copyBucket))
            .catch(reject)
    }),
})