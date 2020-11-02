const app = require('./server')

const port = 3000 || process.env.PORT

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
