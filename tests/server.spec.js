const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    //1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto. 
    it ("/get producto retorna un arreglo y no vacío", async() =>{
        const response = await request(server).get("/cafes").send();
        const body = response.body;
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
    })

    //2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
    it ("/delete producto que no existe", async()=>{
        const jwt = "token";
        const idDeProductoAEliminar = 5
        const response = await request(server)
        .delete(`/cafes/${idDeProductoAEliminar}`)
        .set("Authorization", jwt)
        .send();
        const statusCode = response.statusCode
        expect(statusCode).toBe(404)
    })  

    //3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
    it("Agregando un nuevo café", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafeNuevo = { id, nombre: "Frapuccino" };
        const response = await request(server).post("/cafes").send(cafeNuevo);
        const statusCode = response.statusCode
        expect(statusCode).toBe(201)
    });

    //4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
    it("Comprobar si estoy tratando de sobreescribir un producto que no existe", async () => {
        const idCafe = 2
        const cafeUpdate = { id: 90,
        nombre: "Frapuccino"};
        const response = await request(server).put(`/cafes/${idCafe}`).send(cafeUpdate);
        const statusCode = response.statusCode
        expect(statusCode).toBe(400)
    });

});
