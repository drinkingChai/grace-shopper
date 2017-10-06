const conn = require('./conn');
const { User } = require('./index').models;

const seed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return User.create({ name: 'fooo', email: 'foo@bar.baz', password: 'a' })
    })
}

seed()
  .then(() => {
    console.log('database seeded')
    conn.close()
  })
