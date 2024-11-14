/// <reference types="Cypress" />

describe('Download Invoice after purchase order', () => {
    it('Download Invoice after purchase order', () => {
        const baseEmail = 'testuser1@example.com';
        const username = 'Test User';
        cy.visit('https://automationexercise.com/');
        cy.get('.logo').should('be.visible')
        cy.get('.nav.navbar-nav').should('be.visible')
        cy.get('a').contains('Signup / Login').click()
        cy.get('.login-form > h2').should('be.visible').should('contain', 'Login to your account')
        cy.get('.signup-form > h2').should('be.visible')
        cy.get('[data-qa="signup-name"]').type(username)
        cy.get('[data-qa="signup-email"]').type(baseEmail, { delay: 200 })
        cy.get('[data-qa="signup-button"]').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
        const timestamp = new Date().getTime(); // Генерация уникального email
        const newEmail = `testuser${timestamp}@example.com`;
        cy.get('[data-qa="signup-email"]').clear().type(newEmail, { delay: 200 });
        cy.get('[data-qa="signup-button"]').click()
        cy.get('h2.title.text-center').should('be.visible')
        cy.get('#id_gender1').check()
        cy.get('[data-qa="password"]').type('test123')
        cy.get('[data-qa="days"]').select(25)
        cy.get('[data-qa="months"]').select('June')
        cy.get('[data-qa="years"]').select('1994')
        cy.get('#newsletter').check()
        cy.get('#newsletter').check()
        cy.get('[data-qa="first_name"]').type('Andy')
        cy.get('[data-qa="last_name"]').type('Larkin')
        cy.get('[data-qa="company"]').type('OZON')
        cy.get('[data-qa="address"]').type('New-York, New-York-beach, 10')
        cy.get('[data-qa="address2"]').type('Saint-Peterburg, Newskogo 12/2')
        cy.get('[data-qa="country"]').select('Canada')
        cy.get('[data-qa="state"]').type('Moscow region')
        cy.get('[data-qa="city"]').type('Moscow')
        cy.get('[data-qa="zipcode"]').type('234567')
        cy.get('[data-qa="mobile_number"]').type('+9182345123')
        cy.get('[data-qa="create-account"]').click()
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('.single-products').first().trigger('mouseover')
        cy.get('a.btn.btn-default.add-to-cart').first().should('be.visible').click()
        cy.get('a').contains('View Cart').click()
        cy.get('#cart_info_table').within(() => {
            cy.get('td.cart_price p').should('have.text', 'Rs. 500');
            cy.get('td.cart_quantity button').should('have.text', '1');
            cy.get('td.cart_total p.cart_total_price').should('have.text', 'Rs. 500');
        })
        cy.get('a').contains('Proceed To Checkout').click()
        cy.get('#address_delivery > .address_firstname').should('have.text', 'Mr. Andy Larkin')
        cy.get('#address_delivery > :nth-child(4)').should('have.text', 'New-York, New-York-beach, 10')
        cy.get('#address_invoice > .address_firstname').should('have.text', 'Mr. Andy Larkin')
        cy.get('#address_invoice > .address_city').should('contain', '234567')
        cy.get('.form-control').type('Test payment')
        cy.get('a').contains('Place Order').click()
        cy.get('[data-qa="name-on-card"]').type('Andy Larkin')
        cy.get('[data-qa="card-number"]').type('2345-5555-5555-1111')
        cy.get('[data-qa="cvc"]').type('000')
        cy.get('[data-qa="expiry-month"]').type('25')
        cy.get('[data-qa="expiry-year"]').type('1888')
        cy.get('[data-qa="pay-button"]').click()
        cy.get('.col-sm-9 > p').should('be.visible').should('have.text', 'Congratulations! Your order has been confirmed!')
        const invoiceUrl = 'https://automationexercise.com/download_invoice/500';
        const downloadFolder = 'cypress/downloads';
        const fileName = 'invoice.txt';
        cy.task('downloadFile', { url: invoiceUrl, downloadFolder, fileName });
        cy.readFile(`${downloadFolder}/${fileName}`).should('exist');
    })
})