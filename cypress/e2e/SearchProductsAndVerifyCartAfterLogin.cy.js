/// <reference types="Cypress" />

describe('Search Products and Cart After Login', () => {
    it('Search Products and Verify Cart After Login', () => {
        const searchQuery = 'blue'
        cy.visit('https://automationexercise.com/');
        cy.get('a').contains('Product').click()
        cy.get('.title').should('have.text', 'All Products')
        cy.get('#search_product').type(searchQuery)
        cy.get('#submit_search').click()
        cy.wait(500);
        cy.get('h2.title').should('be.visible').should('contain', 'Searched Products')
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
        cy.get('.single-products').eq(1).trigger('mouseover')
        cy.get('a.btn.btn-default.add-to-cart').first().should('be.visible').click()
        cy.get('button.btn.btn-success.close-modal.btn-block').click()
        cy.get('.single-products').eq(3).trigger('mouseover').find('a.btn.btn-default.add-to-cart').first().should('be.visible').click()
        cy.get('a').contains('View Cart').click({force: true})
        cy.get('#cart_info_table').within(() => {
            cy.get('td.cart_price p').eq(0).should('have.text', 'Rs. 500');
            cy.get('td.cart_quantity button').eq(0).should('have.text', '1');
            cy.get('td.cart_total p.cart_total_price').eq(0).should('have.text', 'Rs. 500');
            cy.get('td.cart_price p').eq(1).should('have.text', 'Rs. 849');
            cy.get('td.cart_quantity button').eq(1).should('have.text', '1');
            cy.get('td.cart_total p.cart_total_price').eq(1).should('have.text', 'Rs. 849');
        })
    })
})