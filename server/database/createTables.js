import {PG_CLIENT} from "../config/configDb.js";

import {
    DEPARTMENT_TABLE,
    STUDENTS_TABLE,
    SEATING_ARRANGEMENTS_TABLE,
    ADMIN_TABLE,
    INVIGILATORS_TABLE,
    EXAM_PLAN_TABLE,
    EXAMINATION_ROOMS,
    INVIGILATORS_ARRANGEMENT
} from "./tableDefinitions.js";

const executeTableCreateQuery = (create_query) => {
    PG_CLIENT.query(create_query)
        .then(() => {
            /* Do Nothing */
        }).
        catch((err) => {
            console.error(err);
        })
}

const SetupDBTables = () => {

    const start_time = Date.now();

    executeTableCreateQuery(DEPARTMENT_TABLE);
    executeTableCreateQuery(STUDENTS_TABLE);
    executeTableCreateQuery(INVIGILATORS_TABLE);
    executeTableCreateQuery(EXAM_PLAN_TABLE);
    executeTableCreateQuery(SEATING_ARRANGEMENTS_TABLE);
    executeTableCreateQuery(ADMIN_TABLE);
    executeTableCreateQuery(EXAMINATION_ROOMS);
    executeTableCreateQuery(INVIGILATORS_ARRANGEMENT);

    console.log(`Successfully set-up the DB, Time Taken: ${Date.now() - start_time}ms`);
}

export default SetupDBTables;