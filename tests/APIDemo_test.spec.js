import {test, expect,request } from '@playwright/test';
import exp from 'constants';
const baseURL = 'https://jsonplaceholder.typicode.com';

test ('POST_AgregarPublicacion', async ({request})=>{
        const respuesta = await request.post(`${baseURL}/posts`,{
        data:{
            "userId": "11234869",
            "id": "1695",
            "title": "Cómo enfrentar los retos según Gandhi",
            "body":"Para enfrentar un reto a la manera de Gandhi, debes aplicar el Satyagraha (fuerza de la verdad y el amor), que implica actuar con verdad, respeto, persistencia y resistencia no violenta."
        }
    }) 
    expect(respuesta.status()).toBe(201);
    const body = await respuesta.json();
    expect(body.title).toContain('Gandhi');

})
 test('PUT_ActualizarPost', async ({ request }) => {
            const respuesta = await request.put(`${baseURL}/posts/100`,{
    data : {
      "userId": "11234869",
      "id":"1695",
      "title" : "Crónica de una muerte anunciada",
      "body": 'Al igual que los gemelos Vicario, algunos individuos sienten la obligación de tomar una acción  body',
    }
   })
    expect(respuesta.status()).toBe(200);
    const body = await respuesta.json();
    expect(body.title).toBe('Crónica de una muerte anunciada');
  });
test('DELETE_EliminarPublicacion', async({request})=>{

    const respuesta = await request.delete(`${baseURL}/posts/100`);
    expect(respuesta.status()).toBe(200);

    console.log(await respuesta.json());
  
});
test('GET_ObtenerPublicacionesCorrectas', async({request})=>{

    const respuesta = await request.get(`${baseURL}/posts`);
    expect(respuesta.status()).toBe(200);
    const body = await respuesta.json();
    expect(body.length).toBeGreaterThan(0);

    console.log(await respuesta.json());
  
});