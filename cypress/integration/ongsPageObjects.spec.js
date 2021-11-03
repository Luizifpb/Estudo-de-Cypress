///// <reference types="cypress" />

//São os mesmos testes do arquivo anterior pórem com uma nova metodologia
import Logon from '../support/pages/Logon'
import NewIncident from '../support/pages/NewIncident';
import Profile from '../support/pages/Profile';
import Register from '../support/pages/Register'


describe('ONG', () => {
    //it.skip - usado para esperar, enquanto configuro o próximo teste
    it('devem poder realizar um cadastro', () => {
        Register.acessarRegistro()
        Register.efetuarRegistro()
        Register.validarRegistroDeOngFeitoComSucesso()
    });

    it('devem poder realizar um login no sistema', () => {
        Logon.acessarLogin()
        Logon.efetuarLogin()
    });

    it('devem poder fazer logout', () => {
        cy.loginDaOng()
        
        cy.wait(2000)
        Profile.clicarNoBotaoLogout()
    });

    it('ongs devem poder criar novos casos', () => {
        cy.loginDaOng()

        Profile.clicarNoBotaoCadastrarCasos()
        NewIncident.cadastrarNovoIncidente()
        NewIncident.validarCadastroDeIncidenteComSucesso()
    
    })

    it('ongs devem poder excluir um novo caso', () => {
        cy.createNewIncident()
        cy.loginDaOng()

        Profile.clicarNoBotaoExcluirCaso()
        Profile.validarExclusaoDoIncidente()

        
    })
});