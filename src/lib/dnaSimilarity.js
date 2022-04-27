// compute similarity using longest common contiguous subsequences
function lccs(text, pattern) {
    var n = text.length;
    var m = pattern.length;

    var index = -1;
    var length = -1;
    var table = [];

    for (let i = 0; i <= n; i++) {
        table[i] = [];
        for (let j = 0; j <= m; j++) {
            if (i == 0 || j == 0) {
                table[i][j] = 0;
            }
            else if (text.charAt(i-1) == pattern.charAt(j-1)) {
                table[i][j] = table[i-1][j-1] + 1;
            }
            else {
                table[i][j] = 0;
            }

            if (table[i][j] > length) {
                length = table[i][j];
                index = i;
            }
        }
    }

    return (index - (index - length)) / m * 100;
}

export default lccs;