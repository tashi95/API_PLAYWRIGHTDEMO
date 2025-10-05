import { test, expect } from '@playwright/test';
import { EmployeeController } from '../controllers/EmployeeController.js';
import { JSONReader } from '../utils/JSONReader.js';
import { allure } from 'allure-playwright';


const baseURL = 'https://dummy.restapiexample.com/api/v1';


 const dataPositiva = JSONReader.readJSON('data.json');
 const dataNegativa = JSONReader.readJSON('data_negativo.json');

//TEST: Crear empleado caso correcto
test('POST_Positivo_CrearEmpleado', async ({ request }) => {
  const response = await EmployeeController.addEmployee(request, baseURL, dataPositiva.newEmployee);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.status).toBe('success');
  expect(body.message).toBe('Successfully! Record has been added.');
  expect(body.data.name).toContain (dataPositiva.newEmployee.name);
});

//TEST: Crear empleado incorrecto (falta campo obligatorio)

test('POST_Negativo_CrearEmpleadoSinNombre', async ({ request }) => {
  const response = await EmployeeController.addEmployee(request, baseURL, dataNegativa.missingName);

  expect(response.status()).toBe(400); // Puede variar
  const body = await response.json();
  expect(body.status).toBe('error');
  expect(body.data).toHaveProperty('name')
});


//TEST: Actualizar empleado caso correcto
test('PUT_Positivo_ActualizarEmpleado', async ({ request }) => {
  const { id, ...employeeData } = dataPositiva.updatedEmployee;

  const response = await EmployeeController.updateEmployee(request, baseURL, id, employeeData);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.status).toBe('success');
   expect(body.message).toBe('Successfully! Record has been updated.');
  expect(body.data).toHaveProperty('name', dataPositiva.updatedEmployee.name);
});


// TEST: Actualizar empleado incorrecto (ID inválido)

test('PUT_Negativo_ActualizarConIDInvalido', async ({ request }) => {
      const { id, ...employeeData } = dataNegativa.employeeWrong;

  const response = await EmployeeController.updateEmployee(request, baseURL,id, employeeData);

 expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body.data.length).toBe(0);                   // debe estar vacío
  expect(body.status).toBe('error');
});


//TEST: Eliminar empleado - Positivo

test('DELETE_Positivo_EliminarEmpleado', async ({ request }) => {
  const { id } = dataPositiva.employeeToDelete;

  const response = await EmployeeController.deleteEmployee(request, baseURL, id);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.status).toBe('success');
 expect((body.data.id)).toBe(id);
   expect(body.message).toBe('Successfully! Record has been deleted.');
});

//TEST: Obtener todos los empleados
test('GET_ObtenerTodosLosEmpleados', async ({ request }) => {
  const response = await EmployeeController.getAllEmployees(request, baseURL);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);
});

//TEST: Obtener empleado por ID caso correcto

test('GET_Positivo_ObtenerEmpleadoPorID', async ({ request }) => {
  const  { id } = dataPositiva.employeeToGet;
  
  const response = await EmployeeController.getEmployeeById(request, baseURL, id);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.id).toBeDefined();
  expect(body.data).toHaveProperty("employee_name","Tiger Nixon")
     expect(body.message).toBe('Successfully! Record has been fetched.');

});

//  TEST: Obtener empleado por ID inválido

test('GET_Negative_ObtenerEmpleadoConIDInvalido', async ({ request }) => {
      const  { id } = dataNegativa.employeeWrong;

  const response = await EmployeeController.getEmployeeById(request, baseURL, id);

  expect(response.status()).toBe(404); 
  const body = await response.json();
  expect(body.status).toBe('error');
  expect(body.message).toBe('Record not found');

});
