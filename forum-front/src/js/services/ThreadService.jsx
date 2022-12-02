import axios from "axios";

export class ThreadService {
  url = "http://localhost:8080/api/threads";

  getAll() {
    return axios.get(this.url).then((response) => response.data);
  }
}
