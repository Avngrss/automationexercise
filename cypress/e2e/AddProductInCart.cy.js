/// <reference types="Cypress" />

describe('Add products', () => {
    it('Add Products in Cart', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Product').click()
        cy.get('.single-products').first().trigger('mouseover')
        cy.get('a.btn.btn-default.add-to-cart').first().should('be.visible').click()
        cy.get('button.btn.btn-success.close-modal.btn-block').click()
        cy.get('.single-products').first().trigger('mouseover')
        cy.wait(2000)
        cy.get('a.btn.btn-default.add-to-cart').first().should('be.visible').click()
        cy.get('a').contains('View Cart').click()
        cy.get('#cart_info_table').within(() => {
            cy.get('td.cart_price p').should('have.text', 'Rs. 500');
            cy.get('td.cart_quantity button').should('have.text', '2');
            cy.get('td.cart_total p.cart_total_price').should('have.text', 'Rs. 1000');
        })
    })
})