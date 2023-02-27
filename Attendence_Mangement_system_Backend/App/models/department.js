module.exports = (sequelize, Sequelize,DataTypes,QueryTypes) => {
    const Depart = sequelize.define("departs", {
      // d_id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true
      // },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      description:{
        type:DataTypes.STRING,
        allowNull:false
      },
     
    }
    ,{
      createdAt: false,
      updatedAt: false
     }
    );
  
    return Depart;
  };
  