/* eslint-disable prettier/prettier */
import Axios from 'axios';

class ApiService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    Axios.create({
      baseURL: this.baseUrl,
      responseType: 'json',
      headers: {'Content-Type': 'application/json'},
      timeout: 5000,
    });
  }

  async get(url: string) {
    const response = await Axios({
      method: 'get',
      url: this.baseUrl + url,
      responseType: 'json',
    });

    return response.data;
  }

  async post(url: string, data: any) {
    const response = await Axios({
      method: 'post',
      url: this.baseUrl + url,
      data: data,
    });
    return response;
  }

  async remove(url: string, id: number) {
    const response = await Axios({
      method: 'delete',
      url: this.baseUrl + url,
      data: {
        id: id,
      },
    });
    return response.data;
  }

  async update(url: string, product: any) {
    const response = await Axios({
      method: 'put',
      url: this.baseUrl + url,
      data: product,
    });
    return response.data;
  }

  async search(url: string, name: string) {
    const response = await Axios({
      method: 'get',
      url: `${this.baseUrl}${url}/${name}`,
      params: {
        name,
      },
    });
    return response.data;
  }
}

export default ApiService;
