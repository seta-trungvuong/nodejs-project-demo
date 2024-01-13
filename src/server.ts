import app from "./app";

const PORT: Number = Number(process.env.PORT || '8000');

app.listen(PORT, (): void => console.log(`running on port ${PORT} - ENV: ${process.env.NODE_ENV}`));