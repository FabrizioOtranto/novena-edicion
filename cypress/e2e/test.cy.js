/// <reference types="cypress" />

describe('Desafio 2', () => {
  it('5 Tareas', () => {
    cy.visit('');
    cy.intercept('POST', '/api/login', (req) => {
      req.body.username = 'pushingit'
    }).as('loginRequest');
    cy.get('#registertoggle').dblclick(); // nos dirige al login de la pagina
    cy.get('#user').type("masterclassMueve"); // ingresamos el usuario
    cy.get('#pass').type("123456!"); // ingresamos la contraseña
    cy.get('#submitForm').click(); // hacemos click en el boton del log in
    cy.wait('@loginRequest', { timeout: 20000 }).then(({ response, request }) => {
      expect(response.statusCode).to.be.equal(200)
      expect(response.body.user.username).to.be.equal('pushingit')
      expect(request.body.username).to.be.equal('pushingit')
      expect(request.body.password).to.be.equal('123456!')
    })
    cy.get('#todolistlink').click(); // nos dirije al modulo de tareas
    cy.get('input#task').type(`Tarea$`); //escribimos una tarea
    cy.get('button#sendTask').click(); // agregamos la tarea
  });
});