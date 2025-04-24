import { Router } from "express";
import { format } from "date-fns";
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

const mapForecastData = (data) => {
  const { time, temperature_2m_max, temperature_2m_min } = data;

  const forecast = time.map((date, index) => ({
    date,
    max: temperature_2m_max[index],
    min: temperature_2m_min[index],
  }));

  return forecast;
};

const renderWeatherForecastItem = (data) => {
  const day = format(new Date(data.date), "E");
  const max = data.max;
  const min = data.min;
  const unit = data.unit[0].toUpperCase();

  return `
    <div class="min-w-28 px-4 py-3 border border-blue-700 bg-blue-950 text-blue-100 rounded-md">
      <div class='text-2xl font-semibold'>
        ${day}
      </div>
      <div class='text-1xl font-semibold'>
        ${max} °${unit}
      </div>
      <div class='text-1xl font-semibold text-blue-400 opacity-50'>
        ${min} °${unit}
      </div>
    </div>
  `;
};

router.get("/", async (req, res) => {
  const city = req.query.city || "London";
  const unit = req.query.unit || "celsius";
  const days = parseInt(req.query.days) || 7;

  try {
    const { latitude, longitude } = await getLatitudeLongitude(city);
    const params = new URLSearchParams({
      latitude,
      longitude,
      temperature_unit: unit,
      forecast_days: days,
      current: "temperature_2m,is_day,rain",
      daily: "temperature_2m_max,temperature_2m_min",
    });

    const result = await axios.get(`${process.env.WEATHER_API_URL}?${params}`);
    const forecast = mapForecastData(result.data.daily);

    res.send(
      `<div class='grid gap-4 grid-cols-7'>${forecast
        .map((item) => renderWeatherForecastItem({ ...item, unit }))
        .join("")}</div>`
    );
  } catch (e) {
    throw new Error(e);
  }
});

export default router;
