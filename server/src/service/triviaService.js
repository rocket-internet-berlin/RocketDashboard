import axios from 'axios';

class TriviaService {

  constructor() {
    this.baseUrl = 'http://numbersapi.com';
  }

  getTodaysTrivia() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const url = `${this.baseUrl}/${month}/${date}/date`;

    return axios.get(url).then(response => ({
      trivia: response.data,
      updated: today,
    }));
  }
}

export default TriviaService;
