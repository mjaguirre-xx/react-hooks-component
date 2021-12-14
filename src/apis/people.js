import axios from 'axios'

const API_URL = 'https://swapi.dev/api'

const axiosGet = async (url = '') =>
  axios.get(url).then((response) => response.data)

export const getPeople = async (persons = 10) => {
  const NUMBER_OF_FETCH = Math.ceil(persons / 10)
  let PEOPLE = []

  for (let i = 1; i <= NUMBER_OF_FETCH; i++) {
    if (i === 1) {
      const responseData = await axiosGet(`${API_URL}/people`)

      PEOPLE.push(...responseData.results)
    } else {
      const responseData = await axiosGet(`${API_URL}/people?page=${i}`)
      PEOPLE.push(...responseData.results)
    }
  }

  return PEOPLE
}

export const getPerson = async (num = 1) => {
  const responseData = await axiosGet(`${API_URL}/people/${num}`)
  return responseData
}
