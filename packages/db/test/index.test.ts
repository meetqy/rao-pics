import { describe, it } from "vitest";

import { createUser, getUsers } from "..";

describe("db", () => {
  it("should create a user", async () => {
    await createUser();
  });

  it("should get users", async () => {
    const res = await getUsers();
    console.log(res);
  });
});
