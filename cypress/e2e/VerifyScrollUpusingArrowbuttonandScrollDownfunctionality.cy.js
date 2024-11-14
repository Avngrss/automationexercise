/// <reference types="Cypress" />

describe("Scroll Up using Arrow button", () => {
    it('Scroll Up using Arrow button and Scroll Down functionality', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('footer').scrollIntoView()
        cy.get('.single-widget > h2').should('contain', 'Subscription')
        cy.get('a#scrollUp').should('be.visible').click()
        cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
    })
})