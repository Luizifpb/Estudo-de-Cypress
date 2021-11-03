
const elements = require('./elements').ELEMENTOS

class Register{
    acessarRegistro(){
        cy.visit('http://localhost:3000/register')
    }

    efetuarRegistro(){
        cy.get(elements.nome).type('Ajudar os outros é top')
        cy.get(elements.email).type('ajude@ajudar.com')
        cy.get(elements.whatsapp).type('87944444444')
        cy.get(elements.cidade).type('Afogados')
        cy.get(elements.uf).type('RS')

        cy.route('POST', '**/ongs').as('postIdAcesso')
        cy.get(elements.botaoenviar).click()
    }

    validarRegistroDeOngFeitoComSucesso(){
        cy.wait('@postIdAcesso').then((xhr) => {
            expect(xhr.status).be.eq(200)
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
        })
    }
}

export default new Register()