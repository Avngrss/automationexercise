/// <reference types="Cypress" />

describe('Brand Products', () => {
    it('View & Cart Brand Products', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a').contains('Product').click()
        cy.get('.brands_products').should('be.visible')
        cy.get('.brands-name > .nav > :nth-child(2) > a').click()
        cy.url().should('contain', 'H&M')
        cy.get('.features_items').should('be.visible').should('have.length.greaterThan', 0)
        cy.get('.brands-name > .nav > :nth-child(8) > a').click()
        cy.url().should('contain', 'Biba')
        cy.get('.features_items').should('be.visible').should('have.length.greaterThan', 0)
    })
})