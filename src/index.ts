import { apiReference } from "@scalar/hono-api-reference";
import { adminCitiesRoute } from "./modules/admin-city/route";
import { citiesRoute } from "./modules/city/route";
import { commonRoute } from "./modules/common/route";
import { placesRoute } from "./modules/place/route";
import { searchRoute } from "./modules/search/route";
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.route("/", commonRoute);
app.route("/cities", citiesRoute);
app.route("/places", placesRoute);
app.route("/search", searchRoute);
app.route("/admin/cities", adminCitiesRoute);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Urbanesia API",
  },
});

app.get(
  "/docs",
  apiReference({
    url: "/openapi.json",
  })
);

export default app;
