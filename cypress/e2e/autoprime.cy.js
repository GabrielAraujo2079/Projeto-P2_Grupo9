// cypress/e2e/autoprime.cy.js

describe('AutoPrime - Testes E2E', () => {

    it('Home carrega os cards de veículo', () => {
        cy.visit('/')
        cy.get('.card').should('have.length.greaterThan', 0)
    })

    it('Search filtra os veículos', () => {
        cy.visit('/')
        cy.get('#searchInput').type('Honda')
        cy.get('.card:visible').each(card => {
            cy.wrap(card).find('.card-name').invoke('text').should('include', 'Honda')
        })
    })

    it('Login com credenciais válidas redireciona para home', () => {
        cy.visit('/pages/login.html')
        cy.get('#usuario').type('admin')
        cy.get('#senha').type('123')
        cy.get('.btn-entrar').click()
        cy.url().should('include', 'index.html')
    })

})