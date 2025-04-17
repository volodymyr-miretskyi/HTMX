import { Router } from "express";
import axios from "axios";

const router = Router();

const getLatitudeLongitude = async (city) => {
  const params = new URLSearchParams({
    name: city,
  });

  const result = await axios.get(
    `${process.env.WEATHER_GEO_API_URL}?${params}`
  );

  return {
    latitude: result.data?.results[0]?.latitude ?? 0,
    longitude: result.data?.results[0]?.longitude ?? 0,
  };
};

//TODO: finish endpoint
router.get("/", async (req, res) => {
  try {
    const { latitude, longitude } = await getLatitudeLongitude("Pidkamin");
    const params = new URLSearchParams({
      latitude,
      longitude,
      daily: "temperature_2m_max,temperature_2m_min",
    });

    const result = await axios.get(`${process.env.WEATHER_API_URL}?${params}`);
    console.log(result.data);

    res.json(
      `<button type="button" hx-get="/api/weather/poll" hx-trigger="click">Click</button>`
    );
  } catch (e) {
    throw new Error(e);
  }
});

export default router;
