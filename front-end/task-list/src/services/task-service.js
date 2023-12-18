import axios from 'axios';

//Define a URL da api

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/tasks',
});

class _TaskService{
  //Método para buscar terfas paginadas
  async getTasks(page = 1, limit = 10){
    try {
      //faz uma chamada GET à API passada os parâmetros de página e limite
      const response = await axiosInstance.get(`?page=${page}&limit=${limit}`);

      //Retorna os dados da resposta
      return response.data;
    } catch (error) {
      //Trata o erro
      throw error;
    }
  };


  async getTask(id){
    try {
      const response = await axiosInstance.get(`/${id}`);
      return response.data.task;
    } catch (error) {
      //Trata erro
      throw error;
    }
  }

  async createTask(task){
    try {
      const response = await axiosInstance.post('/task');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  async updateTask(id, task){
    try {
      const response = await axiosInstance.patch(`/${id}`, task);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  async deleteTask(id){
    try {
      const response = await axiosInstance.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
const TaskService = new _TaskService();
export default TaskService
