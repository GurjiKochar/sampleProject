/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: Sequelize.STRING, 
      allowNull: false
    },
    mobileNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastLoggedIn: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    } 
  },
  associations: function () {
    User.hasMany(Vehicle , {
      foreignKey : {
        name : 'UserId',
        as : 'vehicles'
      }
    });

    User.hasMany(Quotes , {
      foreignKey : {
        name : 'AssigneeId',
        as : 'quotes'
      }
    });
  },
  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'user',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};


