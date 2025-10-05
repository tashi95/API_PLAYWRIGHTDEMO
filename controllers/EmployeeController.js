import { Employee } from '../models/Employee.js';

export class EmployeeController {

  static async addEmployee(request, baseURL, employeeData) {
    const response = await Employee.create(request, baseURL, employeeData);
    return response;
  }

  static async updateEmployee(request, baseURL, id, employeeData) {
    const response = await Employee.update(id, request, baseURL, employeeData);
    return response;
  }

  static async deleteEmployee(request, baseURL, id) {
    const response = await Employee.delete(id, request, baseURL);
    return response;
  }

  static async getAllEmployees(request, baseURL) {
    const response = await Employee.getAll(request, baseURL);
    return response;
  }

  static async getEmployeeById(request, baseURL, id) {
    const response = await Employee.getById(id, request, baseURL);
    return response;
  }
}