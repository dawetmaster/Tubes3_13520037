function borderFunction(pattern) {
    var fail = [];
    fail[0] = 0;

    var m = pattern.length;
    var j = 0;
    var i = 1;

    while (i < m) {
        if (pattern[i] == pattern[j]) {
            fail[i] = j + 1;
            i++;
            j++;
        }
        else if (j > 0){
            j = fail[j-1];
        }
        else {
            fail[i] = 0;
            i++;
        }
    }

    return fail;
}

function matchingWithKMP(text, pattern) {
    var n = text.length;
    var m = pattern.length;

    var fail = borderFunction(pattern);

    var i = 0;
    var j = 0;

    while (i < n) {
        if (text[i] == pattern[j]) {
            if (j == m - 1) {
                return i - m + 1;
            }
            i++;
            j++;
        }
        else if (j > 0) {
            j = fail[j-1];
        }
        else {
            i++;
        }
    }

    return -1;
}

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
                return i;
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

    return -1;
}