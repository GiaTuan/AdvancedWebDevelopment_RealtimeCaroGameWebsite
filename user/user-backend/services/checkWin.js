module.exports = function checkWin(array, i, j)
{
    let result = false;
    //check row
    result = check(array, i, j, 1);
    //check column
    if (result === false ) result = check(array, i, j, 2);
    //check left diagonal line 
    if(result === false) result = check(array, i, j, 3);
    //check right diagonal line
    if (result === false) result = check(array, i, j, 4);
    return result;
}

function check(array, i, j, type)
{
    const Rows = 20;
    const Columns = 20;
    let di;
    let dj;
    let startI=i;
    let startJ=j;
    let count = 1;

    if (type===1)//kiem tra dong
    { 

        //di qua ben trai         
        dj = -1;
        startJ += dj;

        while ( startJ !== -1 )
        {
            if(array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if(array[startI][startJ] !== array[i][j]) break;
            startJ += dj;
        }

        //di qua ben phai
        startJ = j;
        dj = 1;
        startJ += dj;
        while(startJ < Columns)
        {
            if (array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if (array[startI][startJ] !== array[i][j]) break;
            startJ += dj;
        }
    }
    else if (type === 2)
    {
        
        //di len    
        di = -1;
        startI += di;

        while (startI !== -1)
        {
            if (array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if (array[startI][startJ] !== array[i][j]) break;
            startI += di;
        }

        //di xuong
        startI = i;
        di = 1;
        startI += di;
        while (startI < Rows)
        {
            if (array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if (array[startI][startJ] !== array[i][j]) break;
            startI += di;
        }
    }
    else if (type === 3)
    {
        
        //di len    
        di = -1;
        dj = -1;
        startI += di;
        startJ += dj;
        while (startI !== -1 && startJ !== -1)
        {
            if (array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if (array[startI][startJ] !== array[i][j]) break;
            startI += di;
            startJ += dj;
        }

        //di xuong
        startI = i;
        startJ = j;
        di = 1;
        dj = 1;
        startI += di;
        startJ += dj;
        while (startI < Rows && startJ < Columns)
        {
            if (array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if (array[startI][startJ] !== array[i][j]) break;
            startI += di;
            startJ += dj;
        }
    }
    else if (type === 4)
    {
        
        //di len    
        di = -1;
        dj = 1;
        startI += di;
        startJ += dj;
        while (startI !== -1 && startJ < Columns)
        {
            if (array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if (array[startI][startJ] !== array[i][j]) break;
            startI += di;
            startJ += dj;
        }

        //di xuong
        startI = i;
        startJ = j;
        di = 1;
        dj = -1;
        startI += di;
        startJ += dj;
        while (startI < Rows && startJ !== -1)
        {
            if (array[startI][startJ] === array[i][j])
            {
                count++;
            }
            if (array[startI][startJ] !== array[i][j]) break;
            startI += di;
            startJ += dj;
        }
    }

    if (count>=5)
    {
        return true;
    }
    return false;
}