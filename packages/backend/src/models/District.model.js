const DistrictModel = (sequelize, DataTypes) => {
  const District = sequelize.define(
    "District",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "cities",
    }
  );

  District.associate = (models) => {
    District.hasMany(models.City, {
      foreignKey: 'districtId', as: 'cities'
    })

    District.hasMany(models.Address, {
      foreignKey: 'districtId', as: 'addresses'
    })
  }
  return District;
};

module.exports = DistrictModel;