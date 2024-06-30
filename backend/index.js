import app from "./app.js";

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
