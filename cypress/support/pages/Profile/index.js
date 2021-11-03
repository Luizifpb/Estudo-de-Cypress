
const elements = require('./elements').ELEMENTOS

class Profile{
    clicarNoBotaoLogout(){
        cy.get(elements.botaoExcluir).click()
    }

    clicarNoBotaoCadastrarCasos(){
        cy.get(elements.botaoNovoIncidente).click()
    }

    clicarNoBotaoExcluirCaso(){
        cy.route('DELETE', '**/incidents/*').as('incidentExclusao')
        cy.get(elements.botaoExcluirIncidente).click()
    }

    validarExclusaoDoIncidente(){
        cy.wait('@incidentExclusao').then((xhr) => {
            expect(xhr.status).to.eq(204)
            expect(xhr.response.body).to.be.empty
        })
    }
}

export default new Profile()