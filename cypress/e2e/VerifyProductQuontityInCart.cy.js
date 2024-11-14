/// <reference types="Cypress" />

describe('Verify Product quantity', () => {
    it('Verify Product quantity in Cart', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get(':nth-child(5) > .product-image-wrapper > .choose > .nav > li > a').click()
        cy.get('.product-information > h2').should('have.text', 'Sleeveless Dress')
        cy.url().should('contain', '/product_details/3')
        cy.get('#quantity').clear().type(4)
        cy.get('button.btn.btn-default.cart').click()
        cy.get('.modal-content').should('be.visible')
        cy.get('a').contains('View Cart').click()
        cy.get('#cart_info_table').within(() => {
            cy.get('td.cart_quantity button').should('have.text', '4');
        })
    })
})