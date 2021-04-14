function calFactorialNumber(number)
{
    if(number >= 1)
        return (number * calFactorialNumber(number - 1));
    else return 1;
}
function getRandomInt(min, max){
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
function getRandomElementInArray(array)
{
    return array[Math.floor(Math.random() * array.length)];
}
function findMissingElement(arr1, arr2)
{
    var result = [];
    arr1.forEach(element => {
        if(arr2.indexOf(element) === -1) result.push(element);
    });
    return result;
}
