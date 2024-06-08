import { app } from "./main/application/app";

const port: number = Number(process.env.PORT) || 3333;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
