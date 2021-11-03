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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --



// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('createOng', () => {
    cy.request({
        method: 'POST',
        url: 'https://betheheroapi4.herokuapp.com/ongs',
        body:{
            city: "Rua",
            email: "gato@mail.com",
            name: "Gatos bons",
            uf: "RS",
            whatsapp: "87987878787"
        }
    }).then(response => {
        expect(response.body.id).is.not.null
        cy.log(response.body.id)

        Cypress.env('idDaOng', response.body.id)
    

    })  
})

Cypress.Commands.add('createNewIncident', () => {
    cy.request({
        method: 'POST',
        url: 'https://betheheroapi4.herokuapp.com/incidents',
        headers:{
            Authorization: `${Cypress.env('idDaOng')}`
        },
        body:{
            description: "Gato programador, o felino é bom.",
            title: "Patrocinio",
            value: "200"
        }
    }).then(response => {
        expect(response.body.id).is.not.null
        cy.log(response.body.id)

        Cypress.env("idNovoIncidente", response.body.id)
    })
})

//Já que a aplicação testada guarda os dados de login no localStorage podemos utilizar isso para efetuar o login
Cypress.Commands.add('loginDaOng', () => {
    cy.visit('http://localhost:3000/profile', {
            onBeforeLoad:(browser) => {
                browser.localStorage.setItem('ongId', Cypress.env('idDaOng'))
                browser.localStorage.setItem('ongName', 'Gatos bons')
            }
        })
})