/// <reference types="Cypress" />

describe('Rewiev on a product', () => {
    it('Add review on product', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a').contains('Product').click()
        cy.get('.title').should('have.text', 'All Products')
        cy.get('.product-image-wrapper').eq(3).find('li > a').should('contain','View Product').click()
        cy.get('li.active').should('be.visible').should('have.text', 'Write Your Review')
        cy.fixture('userData.json').as('userData')
        cy.get("@userData").then((user) => {
            cy.get('#name').type(user.username)
            cy.get('#email').type(user.email)
            cy.get('#review').type("it's a nice dress!!")
            cy.get('#button-review').click()
            cy.contains('Thank you for your review.').should('be.visible')
        })       
    })
})