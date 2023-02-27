const { tasks } = require(".");

module.exports = (sequelize, Sequelize,DataTypes) => {
    const tasks = sequelize.define("Tasks", {
      // t_id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true
      // },
      name:{
        type:DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false
      },
      assignDate:{
        type:DataTypes.DATEONLY,
        allowNull:false
        
      },
      deadline:{
        type:DataTypes.DATEONLY,
        allowNull:false
        
      },
      status:{
        type:DataTypes.STRING,
        allowNull:false
        
      },
      USERID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }
    ,{
      createdAt: false,
      updatedAt: false
     }
    );
  
    return tasks;
  };
  