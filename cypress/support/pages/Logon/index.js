
const elements = require('./elements').ELEMENTOS

class Logon{
    acessarLogin(){
        cy.visit('http://localhost:3000/')
    }

    efetuarLogin(){
        cy.get(elements.id).type(Cypress.env('idDaOng'))
        cy.get(elements.botaoLogin).click()
    }
}

export default new Logon()