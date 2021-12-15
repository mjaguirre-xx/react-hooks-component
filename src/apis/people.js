import axios from 'axios'

const API_URL = 'https://swapi.dev/api'

export const getPeople = async (persons = 10) => {
  const NUMBER_OF_FETCH = persons / 10;
  let PEOPLE = [];
  let error = 0;
  try {
    for (let i = 1; i <= NUMBER_OF_FETCH; i++) {
      if (i === 1) {
        const responseData = await axios.get(`${API_URL}/people`)
  
        PEOPLE.push(...responseData.results)
      } else {
        const responseData = await axios.get(`${API_URL}/people?page=${i}`)
        PEOPLE.push(...responseData.results)
      }
    }  
  } catch (e) {
		error = 1;
	}

	return [PEOPLE, error];
}

export const getPerson = async (num = 1) => {
  try {
    const responseData = await axios.get(`${API_URL}/people/${num}`)
    return responseData
  } catch (e) {
		console.log(e);
	}
}
