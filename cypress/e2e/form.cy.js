// Opens the login modal
function openLoginModal() {
  cy.visit("http://127.0.0.1:5500/");
  cy.wait(1000);
  cy.get('.modal-footer button[data-auth="login"]').click();
}
// Performs user login
function performLogin(email, password) {
  cy.get("#loginEmail").type(email, { force: true });
  cy.get("#loginPassword").type(password, { force: true });
  cy.get("#loginForm").contains("Login").click();
}
// valid login
describe("Login Functionality", () => {
  it("allows the user to log in with valid credentials", () => {
    openLoginModal();
    performLogin("example@hotmail.com", "example123");
    cy.wait(1000);
    cy.get("button.btn-outline-warning").contains("Logout").should("exist");
  });
});
// invalid login
describe("Invalid Login Handling", () => {
  it("displays an alert message for invalid login attempts", () => {
    openLoginModal();
    performLogin("noEmail@example.com", "Notcorrect");
    cy.wait(1000);

    cy.on("window:alert", (text) => {
      expect(text).to.include(
        "Either your username was not found or your password is incorrect",
      );
    });
  });
});
