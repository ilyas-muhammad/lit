const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const User = require('../../src/models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.person.fullName(),
  email: faker.internet.email({ allowSpecialCharacters: false }).toLowerCase(),
  password,
  role: 'user',
  username: faker.string.alphanumeric(10).toLowerCase(),
  photoProfile: faker.image.url(),
  isEmailVerified: false,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.person.fullName(),
  email: faker.internet.email({ allowSpecialCharacters: false }).toLowerCase(),
  password,
  role: 'user',
  username: faker.string.alphanumeric(10).toLowerCase(),
  photoProfile: faker.image.url(),
  isEmailVerified: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.person.fullName(),
  email: faker.internet.email({ allowSpecialCharacters: false }).toLowerCase(),
  password,
  role: 'admin',
  username: faker.string.alphanumeric(10).toLowerCase(),
  photoProfile: faker.image.url(),
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
