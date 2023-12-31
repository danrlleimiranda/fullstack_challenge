const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          fullName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          addressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'addresses',
              key: 'id'
            }
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          registeredAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
    }, {
        timestamps: true,
        createdAt: 'registered_at',
        underscored: true,
        tableName: 'users'
    })

    User.associate = (models) => {
      User.hasOne(models.Address, {
        foreignKey: 'addressId', as: 'address'
      })
    }

    return User;
}

module.exports = UserModel;