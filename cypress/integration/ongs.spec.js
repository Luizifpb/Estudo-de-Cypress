///// <reference types="cypress" />

describe('ONG', () => {
    //it.skip - usado para esperar, enquanto configuro o próximo teste
    it('devem poder realizar um cadastro', () => {
        //cy.visit - visita uma url
        //cy.get - acessa um elemeno
        //cy.type - insere um texto
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy="Nome da ONG"]').type('Ajudar os outros é top')
        cy.get('[placeholder="E-mail"]').type('ajude@ajudar.com')
        cy.get('[placeholder="WhatsApp"]').type('87944444444')
        cy.get('[placeholder="Cidade"]').type('Afogados')
        cy.get('[placeholder="UF"]').type('RS')

        

        //routing
        //cy.server() - para iniciar o servidor
        //cy.route() - cria a rota
        //atribuir rota a um alias
        //esperar com cy.wait()
        // cy.server() - comentando pois no metodo before já foi iniciado no arquivo index.js
        cy.route('POST', '**/ongs').as('postIdAcesso')
        

        cy.get('.button').click()

        cy.wait('@postIdAcesso').then((xhr) => {
            expect(xhr.status).be.eq(200)
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
        })
        
    });

    it('devem poder realizar um login no sistema', () => {
        //  const ongCriada = Cypress.env('idDaOng') 
        //  cy.log(ongCriada)

        cy.visit('http://localhost:3000/')
        cy.get('input').type(Cypress.env('idDaOng'))
        cy.get('.button').click()
        
    });

    it('devem poder fazer logout', () => {
        cy.loginDaOng()
        
        cy.wait(2000)
        cy.get('button').click()
    });

    it('ongs devem poder criar novos casos', () => {
        cy.loginDaOng()

        cy.get('.button').click()
        cy.get('[placeholder="Título do caso"]').type("Gato talentoso")
        cy.get('textarea').type("O gato sabe programar preciso de patrocínio")
        cy.get('[placeholder="Valor em reais"]').type("500")

        cy.route('POST', '**/incidents').as("novoIncidente")
        cy.get('.button').click()

        cy.wait('@novoIncidente').then((xhr) => {
            expect(xhr.status).to.eq(200)
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
        })

    })

    it('ongs devem poder excluir um novo caso', () => {
        cy.createNewIncident()
        cy.loginDaOng()

        cy.route('DELETE', '**/incidents/*').as('incidentExclusao')
        cy.get('li > button > svg').click()

        cy.wait('@incidentExclusao').then((xhr) => {
            expect(xhr.status).to.eq(204)
            expect(xhr.response.body).to.be.empty
        })
    })
});