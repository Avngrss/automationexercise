/// <reference types="Cypress" />

describe('Remove products', () => {
    it('Remove Products from Cart', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('.single-products').first().trigger('mouseover')
        cy.get('a.btn.btn-default.add-to-cart').first().should('be.visible').click()
        cy.get('button.btn.btn-success.close-modal.btn-block').click()
        cy.get('a').contains('Cart').click({force: true})
        cy.get('.active').should('be.visible').contains('Shopping Cart')
        cy.get('.cart_quantity_delete').click()
        cy.contains('empty')
    })
})