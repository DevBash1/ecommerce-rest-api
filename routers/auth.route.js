const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator.middleware");
const AuthController = require("../controllers/auth.controller");
const {
    loginSchema,
    checkEmailSchema,
    signUpSchema,
} = require("../validators/auth.validator");
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /v1/api/auth/email:
 *   post:
 *     summary: Check if email exists
 *     description: Check if the given email exists in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email exists
 *       400:
 *         description: Bad request, check request body
 */
router.post("/email", validate(checkEmailSchema), (req, res) => {
    AuthController.checkEmail(req, res);
});

/**
 * @swagger
 * /v1/api/auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, check request body
 */
router.post("/signup", validate(signUpSchema), (req, res) => {
    AuthController.signUp(req, res);
});

/**
 * @swagger
 * /v1/api/auth/admin/signup:
 *   post:
 *     summary: Admin Signup
 *     description: Register a new admin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request, check request body
 */
router.post("/admin/signup", validate(signUpSchema), (req, res) => {
    AuthController.signUpAdmin(req, res);
});

/**
 * @swagger
 * /v1/api/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post("/login", validate(loginSchema), (req, res) => {
    AuthController.login(req, res);
});

module.exports = router;
