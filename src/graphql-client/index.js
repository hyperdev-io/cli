const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')

module.exports = (uri) => {
    const apolloClient = new ApolloClient({
        link: new HttpLink({ uri, fetch }),
        cache: new InMemoryCache()
    });

    return {
        instances: require('./instances')(apolloClient),
        apps: require('./apps')(apolloClient),
        buckets: require('./buckets')(apolloClient),
    }
}