import { Hono } from "hono";
import { adminCitiesRoute } from "./modules/admin-city/route";
import { citiesRoute } from "./modules/city/route";
import { commonRoute } from "./modules/common/route";
import { placesRoute } from "./modules/place/route";
import { searchRoute } from "./modules/search/route";

const app = new Hono();

app.route("/", commonRoute);
app.route("/cities", citiesRoute);
app.route("/places", placesRoute);
app.route("/search", searchRoute);
app.route("/admin/cities", adminCitiesRoute);

export default app;
