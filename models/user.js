const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
  first: {
    type: Sequelize.STRING
  },
  last: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 18
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: {
    type: Sequelize.TEXT
  }
  }
  , {
    getterMethods: {
      fullName (User) {
        return `${this.first} ${this.last}`;
      }
    }
});

User.prototype.haveBirthday = function(user) {
  const newAge = this.age + 1
  const email = this.email
  
  return User.update({ age: newAge }, { where: { email : email }}).then(()=>{})
}

module.exports = User;
