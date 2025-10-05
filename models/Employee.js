export class Employee
 {
  static async create(request, baseURL, employeeData) {
    return await request.post(`${baseURL}/create`, { data: employeeData });
  }

  static async update(id, request, baseURL, updatedData) {
    return await request.put(`${baseURL}/update/${id}`, { data: updatedData });
  }

  static async delete(id, request, baseURL) {
    return await request.delete(`${baseURL}/delete/${id}`);
  }

  static async getAll(request, baseURL) {
    return await request.get(`${baseURL}/employees`);
  }

  static async getById(id, request, baseURL) {
    return await request.get(`${baseURL}/employee/${id}`);
  }
}
