import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
  const port = process.env.PORT || 3333;
  server.listen(port, () => console.log(`Server running at port:${port}`));
};

if (process.env.IS_LOCALHOST === "true") {
  startServer();
} else {
  Knex.migrate
    .latest()
    .then(() => Knex.seed.run().then(startServer).catch(console.log))
    .catch(console.log);
}
