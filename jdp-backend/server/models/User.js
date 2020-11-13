import { Model, DataTypes, primaryKey } from 'sequelize';
import { sequelize, connectSequelize } from '../common/db/sequelize';

export default class User extends Model {
  static initialize(sequelize) {
    super.init(
      {
        userId: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        userName: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
      }
    );
  }
}
