import express from "express";
import {
  create,
  update,
  remove,
  get,
  filter,
  dummy,
  applyCalendarFilters,
} from "../controllers/index.js";
import { validations } from "../validations/index.js";

import { checkAuth } from "../middlewares/index.js";
const postRouter = express.Router();
postRouter.use(checkAuth);
postRouter.post("/", validations, create);
postRouter.put("/:id", validations, update);
postRouter.delete("/:id", remove);
postRouter.get("/:id", get);
postRouter.post("/filter", filter);

postRouter.post("/calendar/filters/:timeFrame", applyCalendarFilters);
postRouter.post("/create-dummy-triggers/:number/:minutesAhead", dummy);
const mainRouter = express.Router();

mainRouter.use("/post", postRouter);

export default mainRouter;
