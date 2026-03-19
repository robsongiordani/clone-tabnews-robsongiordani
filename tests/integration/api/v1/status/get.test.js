test("GET to /api/v1/status should return 200", async () => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const response = await fetch(baseUrl + "/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.12");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(
    responseBody.dependencies.database.opened_connections,
  ).toBeGreaterThanOrEqual(0);
});
