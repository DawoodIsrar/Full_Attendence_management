const express = require("express");
const {Sequelize, DataTypes, QueryTypes} = require("sequelize");
module.exports = (sequelize, Sequelize,DataTypes) => {
    const slip = sequelize.define("slips", {
      basic_salary:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      overtime:{
        type:DataTypes.FLOAT,
        // allowNull:false
      },
      remainings_hours:{
        type:DataTypes.FLOAT,
        // allowNull:false
      },
      absenties:{
        type:DataTypes.INTEGER,
        // allowNull:false
      },
      present_days:{
        type:DataTypes.INTEGER,
        // allowNull:false
      },
     total_hours_in_month:{
        type:DataTypes.FLOAT,
        // allowNull:false
      },
      total_hours_completed_month:{
        type:DataTypes.FLOAT,
        // allowNull:false
      },
      overtime_rate:{
        type:DataTypes.INTEGER,
        // allowNull:false
      },
      bonus:{
        type:DataTypes.INTEGER,
        // allowNull:false
      },
      deduction:{
        type:DataTypes.INTEGER,
        // allowNull:false
      },
      reason:{
        type:DataTypes.STRING,
        // allowNull:false
      },
      month:{
        type:DataTypes.DATEONLY,
        allowNull:false
      },
      working_days_in_month:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      working_days_till_today:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      perDaySal:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      perHourSal:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      loanAndAdvances:{
        type:DataTypes.INTEGER,
      },
      USERID: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
   {
    createdAt: false,
    updatedAt: false
   }
    );
    return slip;
  };