import axios from "axios";

export class PostService {
  url = "http://localhost:8080/api/posts";

  getAll() {
    return axios.get(this.url).then((response) => response.data);
  }
  getById(id) {
    return axios.get(`${this.url / id}`).then((response) => response.data);
  }
  save(param) {
    return axios.post(this.url, param).then((response) => response.data);
  }
}
