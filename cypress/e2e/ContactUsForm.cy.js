/// <reference types="Cypress" />

describe("Contact Us Form", () => {
    it('Contact Us Form works currectry', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Contact us').click()
        cy.contains('Get In Touch').should('be.visible')
        cy.get('[data-qa="name"]').type('user')
        cy.get('[data-qa="email"]').type('testemail@gmail.com')
        cy.get('[data-qa="subject"]').type('any text')
        cy.get('[data-qa="message"]').type('any text')
        cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/img.jpg')
        cy.get('[data-qa="submit-button"]').click()
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')
        cy.get('a').contains('Home').click()
        cy.url().should('contain', 'https://automationexercise.com/')
    })
})