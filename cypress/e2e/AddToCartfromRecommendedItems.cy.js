/// <reference types="Cypress" />

describe('Add recommended item', () => {
    it('Add to cart from Recommended items', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.recommended_items > .title').should('be.visible').scrollIntoView()
        cy.wait(6000)
        cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo').should('be.visible').find('a.add-to-cart').click()
        cy.get('u').should('have.text', 'View Cart').click()
        cy.get('#cart_info_table').within(() => {
            cy.get('.cart_product > a > img').should('have.attr', 'src', 'get_product_picture/2')
            cy.get('td.cart_price p').should('have.text', 'Rs. 400');
            cy.get('td.cart_quantity button').should('have.text', '1');
            cy.get('td.cart_total p.cart_total_price').should('have.text', 'Rs. 400');
        })
    })
})