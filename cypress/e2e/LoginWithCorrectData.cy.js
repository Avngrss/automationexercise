/// <reference types="Cypress" />

describe('user can login into the website', () => {
    it('login with correct email and password', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Signup / Login').click()
        cy.get('.login-form > h2').should('be.visible').should('contain', 'Login to your account')
        cy.fixture('userData.json').as('userData')
        cy.get('@userData').then((user) => {
            cy.get('[data-qa="login-email"]').type(user.email)
            cy.get('[data-qa="login-password"]').type(user.password)
            cy.get('[data-qa="login-button"]').click()
            cy.contains('Logged in as').should('be.visible')
        })
    })
})