const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const isPasswordValid = bcrypt.compareSync(password, users[i].passwordHash)
        // console.log(isPasswordValid)
        if (users[i].username === username && isPasswordValid) {
          // console.log('completed login')
          let userToReturn = {...users[i]}
          delete userToReturn.passwordHash
          // console.log(userToReturn)
          return res.status(200).send(userToReturn)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const { username, email, firstName, lastName, password } = req.body
        // console.log('Registering User')
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        let user = {
          username: username,
          email: email,
          firstName,
          lastName,
          passwordHash: passwordHash
        }
        // console.log(req.body)
        users.push(user)
        let userToReturn = {...user}
        delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
    }
}