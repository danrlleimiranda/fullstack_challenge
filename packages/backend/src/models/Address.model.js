const AddressModel = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "cities",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "addresses",
    }
  );

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    })
    Address.belongsTo(models.City, {
      foreignKey: 'cityId', as: 'city'
    })
    Address.belongsTo(models.District, {
      foreignKey: 'districtId', as: 'district'
    })
    
  }

  return Address;
};

module.exports = AddressModel;