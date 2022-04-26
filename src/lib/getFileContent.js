// function to get file content
export function getFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => resolve({
      content: reader.result
    })
    reader.onerror = reject
  })
}