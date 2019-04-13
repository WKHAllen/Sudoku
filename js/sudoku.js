const EMPTY = null;
const NONE_EMPTY = null;
const NO_SOLUTION = null;

function clone(table) {
    return JSON.parse(JSON.stringify(table));
}

function valid(table, number, x, y) {
    let current = table[x - 1][y - 1];
    table[x - 1][y - 1] = EMPTY;
    let row = table[x - 1];
    let column = [];
    for (let arow of table) {
        column.push(arow[y - 1]);
    }
    if (number in row || number in column) {
        table[x - 1][y - 1] = current;
        return false;
    }
    let square = [Math.floor((x - 1) / 3), Math.floor((y - 1) / 3)];
    let values = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let rows = values[square[0]];
    let cols = values[square[1]];
    for (let i of rows) {
        for (let j of cols) {
            if (number === table[i - 1][j - 1]) {
                table[x - 1][y - 1] = current;
                return false;
            }
        }
    }
    table[x - 1][y - 1] = current;
    return true;
}

function validPossibilities(table, x, y) {
    let possibilities = [];
    for (let i = 1; i <= 9; i++) {
        if (valid(table, i, x, y)) {
            possibilities.append(i);
        }
    }
    return possibilities;
}

function firstEmpty(table) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (table[i][j] === EMPTY) {
                return [i + 1, j + 1];
            }
        }
    }
    return NONE_EMPTY;
}

function doSolve(table) {
    let first = firstEmpty(table);
    if (first !== NONE_EMPTY) {
        let possibilities = validPossibilities(table, ...first);
        if (possibilities.length === 0) {
            return NO_SOLUTION;
        }
        for (let value of possibilities) {
            table[first[0] - 1][first[1] - 1] = value;
            let solution = doSolve(clone(table));
            if (solution !== NO_SOLUTION) {
                return solution;
            }
        }
    } else {
        return table;
    }
}

function getSolution(table) {
    table = clone(table);
    let tableClone = [];
    while (table !== tableClone) {
        let tableClone = clone(table);
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 9; j++) {
                if (table[i - 1][j - 1] === EMPTY) {
                    let possibilities = validPossibilities(table, i, j);
                    if (possibilities.length === 1) {
                        table[i - 1][j - 1] = possibilities[0];
                    }
                }
            }
        }
    }
    let solution = doSolve(clone(table));
    return solution;
}

function getTable() {
    // GET THE VALUES IN THE HTML TABLE
}

function setTable(table) {
    // SET THE VALUES IN THE HTML TABLE
}

function solve() {
    let table = getTable();
    let solution = getSolution(table);
    if (solution === NO_SOLUTION) {
        // DO SOMETHING WITH THE HTML HERE: SHOW THAT THERE IS NO SOLUTION
    } else {
        setTable(solution);
        // DO SOMETHING WITH THE HTML HERE: FILL IN THE SOLUTION
    }
}
