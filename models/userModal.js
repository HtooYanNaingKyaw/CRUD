const dbPool = require('../helpers/db_helper')
exports.saveData = async (key, value) => {
    try {

        let saveSQL = "INSERT INTO data(`key`, `value`) VALUES(?, ?)";

        await dbPool.query(saveSQL, [key, value])

        return {
            code: 200,
            status: "success",
            message: "Save Successful"
        }

    } catch (error) {
        return {
            code: 500,
            status: "faill",
            message: error.code === 'ER_DUP_ENTRY' ? "Key must be unique" : error.message
        }
    }
}

exports.getData = async () => {
    try {

        let getSQL = "SELECT * FROM data";

        let data = await dbPool.query(getSQL)

        return {
            code: 200,
            status: "success",
            message: "Get all data Successful",
            data: data
        }

    } catch (error) {
        return {
            code: 500,
            status: "faill",
            message: error.message
        }
    }
}

exports.getDataByKey = async (key) => {
    try {

        let getSQL = "SELECT * FROM data WHERE `key` = ?";

        let data = await dbPool.query(getSQL, key)

        if(data.length > 0) {
            return {
                code: 200,
                status: "success",
                message: "Get data by key Successful",
                data: data
            }
        } else 
            return {
                code: 404,
                status: "not found",
                message: `No Data found with key ${key}`
            }

    } catch (error) {
        return {
            code: 500,
            status: "faill",
            message: error.message
        }
    }
}

exports.deleteDataByKey = async (key) => {
    try {

        let deletSQL = "DELETE FROM data WHERE `key` = ?"

        let data = await dbPool.query(deletSQL, key)

        return {
            code: 200,
            status: "success",
            message: "Delete Successful",
            data: data
        }

    } catch (error) {
        return {
            code: 500,
            status: "faill",
            message: error.message
        }
    }
}


exports.updateDataByKey = async (key, value) => {
    try {

        let updateSQL = "UPDATE  data SET value = ? WHERE `key` = ?"

        let data = await dbPool.query(updateSQL, [value, key])

        return {
            code: 200,
            status: "success",
            message: "Update Successful",
            data: data
        }

    } catch (error) {
        return {
            code: 500,
            status: "faill",
            message: error.message
        }
    }
}
