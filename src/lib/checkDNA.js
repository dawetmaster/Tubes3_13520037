// check DNA sequence by regex
function checkDNA(fileContent) {
  const regex = /^[ATCG]+$/
  const result = regex.test(fileContent)
  return result
}

export default checkDNA;