/* eslint-disable cypress/no-unnecessary-waiting */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'tepavi',
      name: 'Teemu Viikeri',
      password: 'tiikeri',
    })
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('Log in').click()
    cy.get('[data-cy=inputForm]').should('exist')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Log in').click()
      cy.get('[data-cy=input-username]').type('tepavi')
      cy.get('[data-cy=input-password]').type('tiikeri')
      cy.get('[data-cy=login-submit]').click()
      cy.contains('Teemu Viikeri logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Log in').click()
      cy.get('[data-cy=input-username]').type('tepavi')
      cy.get('[data-cy=input-password]').type('väärä salasana')
      cy.get('[data-cy=login-submit]').click()
      cy.get('[data-cy=notification]').should('exist')
      cy.get('[data-cy=notification]').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tepavi', password: 'tiikeri' })
    })

    it('a blog can be created', function () {
      cy.create({
        title: 'The Keyword',
        author: 'Google',
        url: 'https://blog.google/',
        likes: 0,
      })

      cy.get('[data-cy=blog-list]').children().should('have.length', 1)
      cy.contains('The Keyword')
    })

    describe('When blogs exist', function () {
      beforeEach(function () {
        cy.create({
          title: 'The Keyword',
          author: 'Google',
          url: 'https://blog.google/',
          likes: 0,
        })
      })

      context('a blog', function () {
        it('can be liked', function () {
          cy.get('[data-cy=view-btn]').click()
          cy.get('[data-cy=like-btn]').click()
          cy.get('[data-cy=like-btn]').parent().contains('1')
        })

        it('can be removed', function () {
          cy.get('[data-cy=view-btn]').click()
          cy.get('[data-cy=delete-btn]').click()
          cy.get('[data-cy=blog-list]').should('not.contain', 'The Keyword')
        })

        it('cannot be removed by a user who did not add the blog', function () {
          cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'test',
            name: 'Testi Käyttäjä',
            password: 'salasana',
          })

          cy.get('[data-cy=logout-btn]').click()
          cy.contains('Log in').click()

          cy.get('[data-cy=input-username]').type('test')
          cy.get('[data-cy=input-password]').type('salasana')
          cy.get('[data-cy=login-submit]').click()

          cy.get('[data-cy=view-btn]').click()
          cy.get('[data-cy=delete-btn]').should('not.exist')
        })
      })

      context('blogs', function () {
        it('are sorted by amount of likes', function () {
          cy.create({
            title: 'Twitter Blog',
            author: 'Twitter',
            url: 'https://blog.google/',
            likes: 0,
          })

          cy.create({
            title: 'Facebook for Media',
            author: 'Facebook',
            url: 'https://www.facebook.com/formedia/blog',
            likes: 0,
          })

          cy.contains('The Keyword').as('google')
          cy.contains('Twitter Blog').as('twitter')
          cy.contains('Facebook for Media').as('facebook')

          cy.get('@google').contains('view').click()
          cy.get('@twitter').contains('view').click()
          cy.get('@facebook').contains('view').click()

          cy.get('@google').contains('like').click().wait(500)
          cy.get('@twitter').contains('like').click().wait(500)
          cy.get('@twitter').contains('like').click().wait(500)
          cy.get('@facebook').contains('like').click().wait(500)
          cy.get('@facebook').contains('like').click().wait(500)
          cy.get('@facebook').contains('like').click().wait(500)

          cy.get('[data-cy=blog]').as('blogs')
          cy.get('@blogs').first().contains('Facebook for Media')
          cy.get('@blogs').last().contains('The Keyword')
          
        })
      })
    })
  })
})
