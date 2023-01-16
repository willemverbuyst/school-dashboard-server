const starLine = '*******************************************'
const newLine = '\n'
const dashLine = '-------------------------------------------'

export const log = (text: string): void => {
  console.log(dashLine)
  console.log(text)
}

export const logFinish = (text: string): void => {
  console.log(dashLine)
  console.log(text)
  console.log(starLine)
  console.log(newLine)
}

export const logInit = (text: string): void => {
  console.log(starLine)
  console.log(text)
}
