// cypress/e2e/autoprime.cy.js

describe('AutoPrime - Fluxo completo de compra', () => {

  // Antes de cada teste: limpa qualquer estado anterior no browser
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  // ─────────────────────────────────────────────
  // PASSO 1 + 2: Home carrega e exibe os cards
  // ─────────────────────────────────────────────
  it('1-2 | Home carrega todos os cards de veículo', () => {
    cy.visit('/')

    // Deve existir exatamente 8 cards (os carros cadastrados no HTML)
    cy.get('.card').should('have.length', 8)
  })

  // ─────────────────────────────────────────────
  // PASSO 3: Filtro de busca funciona
  // ─────────────────────────────────────────────
  it('3 | Busca por "Honda" exibe somente cards Honda', () => {
    cy.visit('/')

    cy.get('#searchInput').type('Honda')

    // Somente o Honda Civic deve estar visível
    cy.get('.card:visible').should('have.length', 1)
    cy.get('.card:visible .card-name').should('have.text', 'Honda Civic')
  })

  // ─────────────────────────────────────────────
  // PASSOS 4 → 8: Fluxo completo de compra
  // ─────────────────────────────────────────────
  it('4-8 | Usuário navega até Honda Civic, seleciona pagamento e conclui a compra', () => {

    // PASSO 4: abre a home e clica em "Ver oferta" no Honda Civic
    cy.visit('/')

    cy.get('.card')
      .contains('.card-name', 'Honda Civic')   // encontra o card pelo nome
      .closest('.card')                         // sobe até o container do card
      .find('.btn-comprar')                     // pega o botão "Ver oferta"
      .click()

    // PASSO 5: confirma que chegamos na página de compra com os dados corretos
    cy.url().should('include', 'buy.html')
    cy.url().should('include', 'Honda%20Civic')

    cy.get('#carName').should('have.text', 'Honda Civic')
    cy.get('#carPrice').should('have.text', '89.900,00')

    // PASSO 6: seleciona a forma de pagamento "12x"
    cy.get('input[name="payment"][value="12x"]').click()

    // PASSO 7: clica em "Confirmar Compra"
    cy.get('.btn-buy').click()

    // PASSO 8: confirma a mensagem de sucesso
    cy.get('#mensagemCompra')
      .should('be.visible')
      .and('contain.text', 'Honda Civic')
      .and('contain.text', 'sucesso')
  })

})