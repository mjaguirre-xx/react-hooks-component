import axios from 'axios'

const API_URL = 'https://swapi.py4e.com/api'

export const getPeople = async (persons = 10) => {
  const NUMBER_OF_FETCH = persons / 10;
  let PEOPLE = [];
  let error = 0;
  try {
    for (let i = 1; i <= NUMBER_OF_FETCH; i++) {
      if (i === 1) {
        const response = await axios.get(`${API_URL}/people`)
        response.data.results.map((result) => PEOPLE.push(result))
      } else {
        const response = await axios.get(`${API_URL}/people?page=${i}`)
        response.data.results.map((result) => PEOPLE.push(result))
      }
    }  
  } catch (e) {
		error = 1;
	}

	return [PEOPLE, error];
}

export const getPerson = async (count) => {
  try {
    const responseData = await axios.get(`${API_URL}/people/${count + 1}`)
    return responseData
  } catch (e) {
		console.log(e);
	}
}
