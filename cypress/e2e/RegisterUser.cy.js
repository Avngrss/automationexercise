/// <reference types="Cypress" />

describe('template spec', () => {
  it('passes', () => {
    const baseEmail = 'testuser1@example.com';
    const username = 'Test User';
    cy.visit('https://automationexercise.com/');
    cy.get('.logo').should('be.visible')
    cy.get('.nav.navbar-nav').should('be.visible')
    cy.get('a').contains('Signup / Login').click()
    cy.get('.signup-form > h2').should('be.visible')
    cy.get('[data-qa="signup-name"]').type(username)
    cy.get('[data-qa="signup-email"]').type(baseEmail, { delay: 200 })
    cy.get('[data-qa="signup-button"]').click()
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    const timestamp = new Date().getTime(); // Генерация уникального email
    const newEmail = `testuser${timestamp}@example.com`;
    cy.get('[data-qa="signup-email"]').clear().type(newEmail, { delay: 200 });
    cy.wait(5000)
    cy.get('[data-qa="signup-button"]').click()
    cy.get('h2.title.text-center').should('be.visible')
    cy.get('#id_gender1').check()
    cy.get('[data-qa="password"]').type('test123')
    cy.get('[data-qa="days"]').select(25)
    cy.get('[data-qa="months"]').select('June')
    cy.get('[data-qa="years"]').select('1994')
    cy.get('#newsletter').check()
    cy.get('#newsletter').check()
    cy.get('[data-qa="first_name"]').type('Jhon')
    cy.get('[data-qa="last_name"]').type('Smith')
    cy.get('[data-qa="company"]').type('OZON')
    cy.get('[data-qa="address"]').type('Moscow, Moscow-Plaza, 10')
    cy.get('[data-qa="address2"]').type('Saint-Peterburg, Newskogo 12/2')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('Moscow region')
    cy.get('[data-qa="city"]').type('Moscow')
    cy.get('[data-qa="zipcode"]').type('1234567')
    cy.get('[data-qa="mobile_number"]').type('+9182345123')
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.get(':nth-child(10) > a').should('be.visible').should('contain', `Logged in as ${username}`)
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain', 'Logout').click()
    cy.url().should('include', '/login')
  })
})