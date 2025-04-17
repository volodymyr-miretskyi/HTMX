import { Router } from "express";

const router = Router();

router.post("/convert", async (req, res) => {
  try {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celsiusDegree = ((fahrenheit - 32) * 5) / 9;

    res.send(
      `
      <h1 class="text-xl font-">Fahrenheit to Celsius</h1>
      <h2>${fahrenheit}°F = ${celsiusDegree.toFixed(2)}°C</h2>
      `
    );
  } catch (e) {
    throw new Error(e);
  }
});

export default router;
