const DNAregex = /^[ACGT]*$/;

// DNA SEQUENCE checker from string
function checkDNA(dna) {
    if (dna.match(DNAregex)) {
        return true;
    }
    return false;
}

export default checkDNA;