import app from "./app";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`HRIS Backend API is running on http://localhost:${PORT}`);
});
