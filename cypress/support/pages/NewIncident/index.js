
const elements = require('./elements').ELEMENTOS

class NewIncident{
    cadastrarNovoIncidente(){
        cy.get(elements.titulo).type("Gato talentoso")
        cy.get(elements.descricao).type("O gato sabe programar preciso de patrocínio")
        cy.get(elements.valor).type("500")

        cy.route('POST', '**/incidents').as("novoIncidente")
        cy.get(elements.botaoEfetuarCadastro).click()
    }

    validarCadastroDeIncidenteComSucesso(){
        cy.wait('@novoIncidente').then((xhr) => {
            expect(xhr.status).to.eq(200)
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
        })
    }
}

export default new NewIncident()