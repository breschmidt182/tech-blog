const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./Post');
const User = require('./User')


class Comment extends Model {}

Comment.init(
    {
        id:{
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
        },
        content:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                Model: 'user',
                key: 'id'
            }
        },
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                Model: 'post',
                key: 'id'
            },
        }
    },

    {
        sequelize,
        timestamps: true
    }
)

module.exports = Comment;