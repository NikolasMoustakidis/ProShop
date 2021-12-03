import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Nikolas Moustakidis',
    email: 'nikolas@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Theo Moustakidis',
    email: 'theo@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
