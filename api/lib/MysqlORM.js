const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    process.env.MYSQL_DB, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
});

sequelize.define('Push', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    desp: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ""
    },
    readkey: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    wxstatus:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
},
{
  tableName: 'push',
  indexes:[
    {
        unique: false,
        fields:['readkey']
    },
    {
        unique: false,
        fields:['openid']
    }
   ]
});

sequelize.define('User', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        unique: true
    },
    session_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    headimgurl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    level: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
    },
    sendkey: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    send_to_wechat: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
    },
    send_to_ios: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
    },
    send_to_android: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
    },
    css_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ""
    },
    js_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ""
    }
  },
  {
    tableName: 'user'
});

(async ()=>
{
    await sequelize.models.User.sync();
    await sequelize.models.Push.sync();
})();

module.exports =  sequelize;