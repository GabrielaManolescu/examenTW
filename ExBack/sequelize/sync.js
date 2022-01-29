import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js"
import { sequelizeOperationsAPI } from "./operations-api.js";
import dotenv from "dotenv";
dotenv.config();


//EXAMEnnn
// const sequelizeConnection = new Sequelize("fisier",
//     "postgres",//sau mariabd
//     "1995",//parola
//     sequelizeConfigProps);


let config
if (process.env.NODE_ENV == 'production') {
    config = {
        logging: false,
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
} else {
    config = {
        logging: true
    }
}

const sequelizeConnection = new Sequelize(process.env.DATABASE_URL, config);



export const Shelves = sequelizeConnection.define("Shelves", {
    // BookId: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     allowNull: false,
    // },
    // BookName: {
    //     type: Sequelize.STRING,
    // },
    // Gen: {
    //     type: Sequelize.STRING,
    // },
    // Url: {
    //     type: Sequelize.STRING,
    // },


    ShelfId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Description: {
        type: Sequelize.STRING,
    },
    // Date: {
    //     type: Sequelize.DECIMAL(18, 2),
    // },
    Date: {
        type: Sequelize.DATE,
    }
});

export const Books = sequelizeConnection.define("Books", {
    // ShelfId: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     allowNull: false,
    // },
    // Description: {
    //     type: Sequelize.STRING,
    // },
    // // Date: {
    // //     type: Sequelize.DECIMAL(18, 2),
    // // },
    // Date: {
    //     type: Sequelize.DATE,
    // },
    // BookId: {
    //     type: Sequelize.INTEGER,
    // },
    BookId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    BookName: {
        type: Sequelize.STRING,
    },
    Gen: {
        type: Sequelize.STRING,
    },
    Url: {
        type: Sequelize.STRING,
    },
    ShelfId: {
        type: Sequelize.INTEGER,
    },


});

Shelves.hasMany(Books, {
    foreignKey: "ShelvesId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});





sequelizeOperationsAPI.init(sequelizeConnection);

export { sequelizeConnection };