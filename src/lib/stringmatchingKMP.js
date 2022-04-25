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
                return true;
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

    return false;
}

export default matchingWithKMP;