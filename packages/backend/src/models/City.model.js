const CityModel = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      districtId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "districts",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "cities",
    }
  );

  City.associate = (models) => {

    City.hasMany(models.Address, {
      foreignKey: 'cityId', as: 'addresses'
    })
    City.belongsTo(models.District, {
      foreignKey: 'districtId', as: 'district'
    })
  }
  
  return City;
};

module.exports = CityModel;
