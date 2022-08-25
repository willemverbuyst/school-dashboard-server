interface School {
  id: string
  name: string
  location: string
}

export interface ApiSchool {
  result: number
  data: Array<School>
}
