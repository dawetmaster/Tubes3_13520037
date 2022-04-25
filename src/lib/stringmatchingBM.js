function buildLastOccurences(pattern) {
    var lastOccur = [];

    for (let i = 0; i < 128; i++) {
        lastOccur[i] = -1;
    }
    
    for (let i = 0; i < pattern.length; i++) {
        lastOccur[pattern[i]] = i;
    }

    return lastOccur;
}

function matchingWithBM(text, pattern) {
    var lastOccur = buildLastOccurences(pattern); 
    var n = text.length;
    var m = pattern.length;
    var i = m-1;
    
    if (i > n-1) {
        return -1;
    }

    var j = m-1;
    do {
        if (text[i] == pattern[j]) {
            if (j == 0) {
                return true;
            }
            else {
                i--;
                j--;
            }
        }
        else {
            var lo = lastOccur[text[i]];
            i = i + m - Math.min(j, 1+lo);
            j = m - 1;
        }
    } while (i <= n-1);

    return false;
}

export default matchingWithBM;