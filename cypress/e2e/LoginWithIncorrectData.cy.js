/// <reference types="Cypress" />

describe("user can't login into the website", () => {
    it('login with incorrect email and password', () => {
        const userEmail = 'testuser1731315476086@example.com'
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Signup / Login').click()
        cy.get('.login-form > h2').should('be.visible').should('contain', 'Login to your account')
        cy.get('[data-qa="login-email"]').type(userEmail)
        cy.get('[data-qa="login-password"]').type('test12323dd')
        cy.get('[data-qa="login-button"]').click()
        cy.contains('Your email or password is incorrect!').should('be.visible')
    })
})