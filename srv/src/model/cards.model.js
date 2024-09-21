import { DataTypes } from 'sequelize';
import sequelize from 'sequelize';

const Cards = sequelize.define('Cards',{
    id_cards :{
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        field: 'id_cards',
    },
   front: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   verse: {
    type: DataTypes.STRING,
    allowNull: false
   }    
   });

   export default Cards;
