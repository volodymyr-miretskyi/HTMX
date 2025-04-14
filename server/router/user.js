import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  const limit = +req.query.limit || 10;
  try {
    const params = new URLSearchParams({
      _limit: limit,
    });

    const { data: users } = await axios.get(
      `https://jsonplaceholder.typicode.com/users?${params}`
    );

    res.send(`
      <h1 class="text-2xl font-bold">Users</h1>
      <ul class="text-xl text-blue-700 my-3">
      ${users.map((user) => `<li>${user.id}: ${user.name}</li>`).join("")}
      </ul>
      `);
  } catch (e) {
    throw new Error(e);
  }
});

export default router;
