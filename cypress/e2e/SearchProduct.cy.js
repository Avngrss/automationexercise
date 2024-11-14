/// <reference types="Cypress" />

describe('Search product in the input', () => {
    it('Search Product', () => {
        const searchQuery = 'blue'
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Products').click()
        cy.url().should('contain', '/products')
        cy.get('.title').contains('All Products')
        cy.get('.features_items').should('be.visible')
        cy.get('#search_product').type(searchQuery)
        cy.get('#submit_search').click()
        cy.wait(500);
        cy.get('h2.title').should('be.visible').should('contain', 'Searched Products')
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
    })
})