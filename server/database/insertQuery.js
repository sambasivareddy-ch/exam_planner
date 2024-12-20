import {PG_CLIENT} from "../config/configDb.js";

const executeInsertQuery = async (query) => {
    try {
        const results = await PG_CLIENT.query(query);

        return results.rows.length;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

export default executeInsertQuery;