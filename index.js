const express = require('express')
const next = require('next');
const PORT = process.env.PORT || 3000;
const { graphqlHTTP } = require('express-graphql');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // use graphql express middleware
  // server.use(
  //   '/graphql',
  //   graphqlHTTP({
  //     schema: MyGraphQLSchema,
  //     graphiql: true,
  //   }),
  // );

  server.get('/hi', (req, res)  => res.send('hi'))

  // server.all('*', (req, res) => {
  //   return handle(req, res)
  // })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})