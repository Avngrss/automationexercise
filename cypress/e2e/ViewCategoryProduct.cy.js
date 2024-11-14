/// <reference types="Cypress" />

describe('Remove products', () => {
    it('Remove Products from Cart', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.left-sidebar').should('be.visible')
        cy.get('a').contains('Women').click()
        cy.get('#Women > .panel-body > ul > :nth-child(1) > a').click()
        cy.get('.title').should('have.text', 'Women - Dress Products')
        cy.get(':nth-child(2) > .panel-heading > .panel-title > a').click()
        cy.get('#Men > .panel-body > ul > :nth-child(1) > a').click()
        cy.get('.title').should('have.text', 'Men - Tshirts Products')
        cy.url().should('contain', '/category_products/3')
    })
})