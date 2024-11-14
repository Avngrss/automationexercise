/// <reference types="Cypress" />

describe('Can open the product page and detail product', () => {
    it('Verify Test Cases Page', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Products').click()
        cy.url().should('contain', '/products')
        cy.get('.title').contains('All Products')
        cy.get('.features_items').should('be.visible')
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
        cy.url().should('contain', '/product_details/1')
        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(6) > b').should('be.visible')
        cy.get(':nth-child(7) > b').should('be.visible')
        cy.get(':nth-child(8) > b').should('be.visible')
    })
})