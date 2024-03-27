describe('Word Selection Test', () => {
    it('Should select each word and display the correct message', () => {
      cy.visit('http://localhost:5173'); // Update with your application URL
  
      const words = ["I", "LOve", "JavaScript", "COurses", "From", "Joao", "Marques"];

      cy.get('input[placeholder="Pick a word"]')
      .should("exist")
      .type("The");
    

      cy.get('input[placeholder="Pick a word"]')
      .should("exist")
      .type("The");
    
    });
  });
  