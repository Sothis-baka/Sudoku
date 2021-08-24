const CANDIDATES = [1,2,3,4,5,6,7,8,9];
const REVERSED_CANDIDATES = [9,8,7,6,5,4,3,2,1];

/* Fisher-Yates shuffle */
const shuffle = (array) => {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
};

/* helper function to print the matrix in console */
const printMatrix = (matrix) => {
    for(let i=0; i<9; i++){
        console.log(matrix.slice(i * 9 , i * 9 + 9).toString());
    }
    console.log();
};

/* check if current choice is valid */
const isValid = (matrix, index, choice) => {
    let row = Math.floor(index / 9);
    let col = index % 9;
    let i,j;

    // row
    for(i=0; i<9; i++){
        if(i !== col && matrix[9 * row + i] === choice){
            return false;
        }
    }

    // line
    for(i=0; i<9; i++){
        if(i !== row && matrix[9 * i + col] === choice){
            return false;
        }
    }

    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    // square
    let cmpIndex;
    for(i=row; i < row+3; i++){
        for(j=col; j<col+3; j++){
            cmpIndex = 9 * i+ j;

            if(matrix[cmpIndex] === choice && cmpIndex !== index){
                return false;
            }
        }
    }

    return true;
};

/* helper function to compare if two matrix are the same */
const cmpMatrix = (mtx1, mtx2) => {
    for(let i=0; i<81; i++){
        if(mtx1[i] !== mtx2[i]){
            return false;
        }
    }

    return true;
};

/* fill matrix from current status */
const findAnswer = (matrix) => {
    let index = matrix.indexOf(0);
    // full
    if(index < 0){
        return true;
    }

    for(let temp of CANDIDATES){
        if(isValid(matrix, index, temp)){
            matrix[index] = temp;

            if(findAnswer(matrix)){
                return true;
            }

            matrix[index] = 0;
        }
    }

    // not match
    return false;
};

/* fill matrix from current status in an opposite order */
const findAnswerReversely = (matrix) => {
    let index = matrix.indexOf(0);
    // full
    if(index < 0){
        return true;
    }

    for(let temp of REVERSED_CANDIDATES){
        if(isValid(matrix, index, temp)){
            matrix[index] = temp;

            if(findAnswerReversely(matrix)){
                return true;
            }

            matrix[index] = 0;
        }
    }

    // not match
    return false;
};

/* initialize the basic matrix (top left, center, bottom right) then it takes less time to fill it */
const basicMatrix = (matrix) => {
    const shuffledCs = CANDIDATES.slice();
    let i, j, value;

    matrix.fill(0);

    shuffle(shuffledCs);
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            value = shuffledCs.shift();
            matrix[9 * i + j] = value;
            shuffledCs.push(value);
        }
    }

    shuffle(shuffledCs);
    for(i=3; i<6; i++){
        for(j=3; j<6; j++){
            value = shuffledCs.shift();
            matrix[9 * i + j] = value;
            shuffledCs.push(value);
        }
    }

    shuffle(shuffledCs);
    for(i=6; i<9; i++){
        for(j=6; j<9; j++){
            value = shuffledCs.shift();
            matrix[9 * i + j] = value;
            shuffledCs.push(value);
        }
    }
};

const initGame = (strDifficulty) => {
    const cur_matrix = new Array(81);
    let index, temp;
    const triedI = [];
    let difficulty;
    switch (strDifficulty){
        case "Easy":
            difficulty = 30;
            break;
        case "Medium":
            difficulty = 40;
            break;
        case "Hard":
            difficulty = 50;
            break;
        case "Expert":
            difficulty = 60;
            break;
        default:
            difficulty = Math.floor(Math.random() * 40 + 30);
    }

    basicMatrix(cur_matrix);
    findAnswer(cur_matrix);
    const final_matrix = cur_matrix.slice();

    while(difficulty > 0){
        if(triedI.length === 72){
            console.log("Can't remove any");
            break;
        }

        index = Math.floor(81 * Math.random());

        if(cur_matrix[index] === 0 || triedI.includes(index)){
            continue;
        }

        temp = cur_matrix[index];
        cur_matrix[index] = 0;
        const copy_matrix = cur_matrix.slice();
        const copy_matrixR = cur_matrix.slice();

        // make sure it won't have more than one answer.
        findAnswer(copy_matrix);
        findAnswerReversely(copy_matrixR);

        if(!cmpMatrix(copy_matrix, copy_matrixR)){
            cur_matrix[index] = temp;
        }else{
            difficulty--;
        }

        triedI.push(index);
    }

    return {cur_matrix,final_matrix};
};

export { printMatrix, isValid, initGame, CANDIDATES };