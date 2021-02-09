export const addBase64Prefix = (imageString?: string) => {
  if (imageString) {
    return `data:image/png;base64, ${imageString}`
  }
  return undefined
}
