describe("School-daschboard api", () => {
  context("GET /schools", () => {
    it("should return a list with all schools", () => {
      cy.request({
        method: "GET",
        url: "/schools",
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.results).to.eq(2);
        expect(response.body.data.length).to.be.eq(2);
        expect(response.body.data[0]).to.have.all.keys(
          "id",
          "name",
          "location"
        );
      });
    });
  });
});
