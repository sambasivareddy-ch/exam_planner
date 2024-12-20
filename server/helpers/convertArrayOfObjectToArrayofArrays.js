const convertArrayOfObjectsToArrayOfArrays = (arrObj, ...extraData) => {
    const resultantArray = [];

    for (const resultElement of arrObj) {
        const newElement = []

        for (const key in resultElement) {
            newElement.push(resultElement[key]);
        }

        for (let j = 0; j < extraData.length; j++) {
            newElement.push(extraData[j]);
        }

        resultantArray.push(newElement);
    }

    return resultantArray;
}

export default convertArrayOfObjectsToArrayOfArrays;