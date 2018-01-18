const Vorpal = require('vorpal')
const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')

const {
    appLs,
    instanceLs,
} = require('./commands')

const tableStyle = {
    chars: {
        'top': '', 'top-mid': '', 'top-left': '', 'top-right': ''
        , 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
        , 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': ''
        , 'right': '', 'right-mid': '', 'middle': ' '
    },
    style: { 'padding-left': 0, 'padding-right': 0 }
}

const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3010/graphql', fetch }),
    cache: new InMemoryCache()
});
vorpal = Vorpal()

vorpal.command('app ls', 'List Applications')
    .action(appLs({apolloClient, tableStyle}))
vorpal.command('instance ls', 'List Instances')
    .action(instanceLs({ apolloClient, tableStyle }))

if(process.argv.length > 2){
    // non interactive
    vorpal.exec(process.argv.slice(2).join(' '));
} else {
    // interactive
    vorpal.delimiter('BigBoat CLI />')
    vorpal.show().parse(process.argv);
}