/// <reference types="Cypress" />

describe('Can open the Test Cases Page', () => {
    it('Verify Test Cases Page', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Test Cases').click()
        cy.url().should('contain', '/test_cases')
    })
})