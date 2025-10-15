import express from "express";
import Joi from "joi";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

const authSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

router.post("/register", validate(authSchema), register);
router.post("/login", validate(authSchema), login);

export default router;
