import matchingWithBM from "./stringmatchingBM";
import matchingWithKMP from "./stringmatchingKMP";

function longestCommonSubsequences(text, pattern) {
    var n = text.length;
    var m = pattern.length;

    var table = [];

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i == 0 || j == 0) {
                table[i][j] = 0;
            }
            else if (text.charAt(i-1) == pattern.charAt(j-1)) {
                table[i][j] = table[i-1][j-1] + 1;
            }
            else {
                table[i][j] = Math.max(table[i][j-1], table[i-1][j]);
            }
        }
    }

    return table;
}

function similarityWithLCS(text, pattern) {
    if (matchingWithKMP(text, pattern) || matchingWithBM(text, pattern)) {
        return "100%";
    }
    
    var table = longestCommonSubsequences(text, pattern);

    var longestSubsequence = 0;
    var n = text.length;
    var m = pattern.length;

    while (n > 0 && m > 0 && table[n][m] != 0) {
        if (table[n][m] == table[n-1][m]) {
            n--;
        }
        else if (table[n][m] == table[n][m-1]) {
            m--;
        }
        else {
            longestSubsequence += 1;
            n--;
            m--;
        }
    }

    var percentage = longestSubsequence / m * 100;

    return percentage.toString() + "%";
}

export default similarityWithLCS;