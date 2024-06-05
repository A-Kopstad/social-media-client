describe("Logout Function", () => {
  it("log in user, and log out, then check for login btn to confirm", () => {
    cy.visit("/?view=profile&name=jajajajajaja");
    cy.wait(1000);

    // modal
    cy.get('.modal-footer button[data-auth="login"]').click();

    // login
    cy.get("#loginEmail").invoke("val", "jajajajajaja@stud.noroff.no");
    cy.get("#loginPassword").invoke("val", "jajajajajaja");
    cy.wait(1000);

    // login form
    cy.get("#loginForm button").contains("Login").click();
    cy.wait(1000);

    // click the logout to check if the user can logout
    cy.get('button[data-auth="logout"]').click();

    // check if login btn is visible to confirm
    cy.get('.modal-footer button[data-auth="login"]').should("exist");
  });
});
