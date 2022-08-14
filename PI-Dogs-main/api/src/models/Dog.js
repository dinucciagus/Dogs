const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height_Min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height_Max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight_Min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight_Max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      life_span_Min: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      life_span_Max: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        //distingo los dogs de la api con los creados por el cliente.
      },
    },
    { timestamps: false }
  );
};
