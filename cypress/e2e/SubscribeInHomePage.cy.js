/// <reference types="Cypress" />

describe('Subscription from the home page', () => {
    it('Verify Subscription in home page', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('#footer').scrollIntoView()
        cy.get('.single-widget > h2').should('contain', 'Subscription')
        cy.get('#susbscribe_email').type('test@gmail.com')
        cy.get('#subscribe').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
    })
})