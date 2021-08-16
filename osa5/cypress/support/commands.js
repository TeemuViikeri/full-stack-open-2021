// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('create', (blog) => {
  cy.request('GET', 'http://localhost:3003/api/users')
    .then((res) => {
      new Promise((resolve, reject) => {
        resolve(res)
      })
    })
    .then((res) => {
      const id = res.body[0].id
      console.log(id)
      cy.request({
      	url: 'http://localhost:3003/api/blogs',
      	method: 'POST',
      	body: { ...blog, id},
      	headers: {
      		Authorization: `bearer ${
      			JSON.parse(localStorage.getItem('loggedUser')).token
      		}`,
      	},
      })
    })

  cy.visit('http://localhost:3000')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
