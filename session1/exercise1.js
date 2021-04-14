function numberWithCommas(number) {
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var result = number.toString();
    return result.replace(regex, ",");
}

function shortenMoney(number) {
    var tempNum = number;
    var count = 0;
    var res = 0;
    while(tempNum / 1000 >= 1)
    {
        count++; 
        tempNum /= 1000;
    }
    res = tempNum;
    if(Math.round(tempNum) != tempNum) {
        res = res.toFixed(2);
    }
    
    switch(count) {
        case 1: 
            return res + "K";
        case 2: 
            return res + "M";
        case 3:
            return res + "B";
        default:
            return res;
    }
}
function isUpperCase(char) {
    return char.toUpperCase() === char;
}

function countWords(string) {
    var count = 1;
    for(let i = 1; i < string.length; i++) {
        const character = string[i];
        if(isUpperCase(character)) { 
            count++;
        }
    }
    return count;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}
function formatNumber(number){
        var result = "";
        var str = number.toString();
        var count = 0;
        for(var i = str.length - 1; i >= 0; i--){
            result += str[i];
            count++;
            if(count === 3)
            {
                result += ',';
                count =0;
            }
        }
        return reverseString(result);
}

function getExtensionName(fileName){
    var posExtensionName = fileName.lastIndexOf('.');
    extensionName = fileName.slice(posExtensionName + 1, fileName.length);
    return extensionName;
}
