const starLine = '*******************************************'
const newLine = '\n'
const dashLine = '-------------------------------------------'

export const logInitRemoval = (): void => {
	console.log(starLine)
	console.log(`STARTING TO REMOVE DATA FROM TABLES...`)
}

export const logRemoval = (table: string): void => {
	console.log(dashLine)
	console.log(`Removed data the ${table} table`)
}

export const logFinishRemoval = (): void => {
	console.log(dashLine)
	console.log(`DONE, REMOVED DATA FROM TABLES`)
	console.log(starLine)
	console.log(newLine)
}
