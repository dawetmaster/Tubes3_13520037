import lccs from "./dnaSimilarity";

function buildLastOccurences(pattern) {
    var lastOccur = new Array(128);

    for (let i = 0; i < 128; i++) {
        lastOccur[i] = -1;
    }
    
    for (let i = 0; i < pattern.length; i++) {
        lastOccur[pattern.charAt(i)] = i;
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
        if (text.charAt(i) == pattern.charAt(j)) {
            if (j == 0) {
                return true;
            }
            else {
                i--;
                j--;
            }
        }
        else {
            var lo = lastOccur[text.charAt(i)];
            i = i + m - Math.min(j, 1+lo);
            j = m - 1;
        }
    } while (i <= n-1);

    return lccs(text, pattern) < 80 ? false : true;
}

export default matchingWithBM;