const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const validate = require("../middlewares/validator.middleware");
const ItemController = require("../controllers/item.controller");
const { createItemSchema } = require("../validators/item.validator");
/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Endpoints for managing items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         picture:
 *           type: string
 *         price:
 *           type: number
 *       required:
 *         - name
 *         - picture
 *         - price
 */

/**
 * @swagger
 * /v1/api/items/all:
 *   get:
 *     summary: Get all items
 *     description: Retrieve a list of all items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of items
 */
router.get("/all", auth(), (req, res) => {
    ItemController.getItems(req, res);
});

/**
 * @swagger
 * /v1/api/items/cart:
 *   get:
 *     summary: Get cart items
 *     description: Retrieve a list of items in the user's cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of cart items
 */
router.get("/cart", auth(), (req, res) => {
    ItemController.getCartItems(req, res);
});

/**
 * @swagger
 * /v1/api/items/cart:
 *   get:
 *     summary: Get cart items
 *     description: Retrieve a list of items in the user's cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of cart items
 */
router.get("/cart", auth(), (req, res) => {
    ItemController.getCartItems(req, res);
});

/**
 * @swagger
 * /v1/api/items/cart/add/{id}:
 *   get:
 *     summary: Place Order
 *     description: Place order for items in cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the order data
 */
router.get("/cart/order", auth(), (req, res) => {
    ItemController.placeOrder(req, res);
});

/**
 * @swagger
 * /v1/api/items/cart/remove/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     description: Remove a specific item from the user's cart
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the item to be removed from the cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the updated user data
 */
router.delete("/cart/remove/:id", auth(), (req, res) => {
    ItemController.removeFromCart(req, res);
});

/**
 * @swagger
 * /v1/api/items/search:
 *   get:
 *     summary: Search items
 *     description: Search for items by name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the item to search for
 *     responses:
 *       200:
 *         description: Successful response with a list of found items
 */
router.get("/search", auth(), (req, res) => {
    ItemController.searchItems(req, res);
});

// ADMIN ROUTES

/**
 * @swagger
 * /v1/api/items/add:
 *   put:
 *     summary: Add item (Admin)
 *     description: Add a new item to the inventory (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateItem'
 *     responses:
 *       200:
 *         description: Successful response with the newly added item
 */
router.put("/add", admin(), validate(createItemSchema), (req, res) => {
    ItemController.adminAddItem(req, res);
});

/**
 * @swagger
 * /v1/api/items/update:
 *   patch:
 *     summary: Update item (Admin)
 *     description: Update details of an existing item in the inventory (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateItem'
 *     responses:
 *       200:
 *         description: Successful response with the updated item details
 */
router.patch("/update", admin(), validate(createItemSchema), (req, res) => {
    ItemController.adminUpdateItem(req, res);
});

/**
 * @swagger
 * /v1/api/items/remove:
 *   delete:
 *     summary: Remove item (Admin)
 *     description: Remove an item from the inventory (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the removed item details
 */
router.delete("/remove", admin(), (req, res) => {
    ItemController.adminRemoveItem(req, res);
});

/**
 * @swagger
 * /v1/api/items/order/approve:
 *   post:
 *     summary: Approve order (Admin)
 *     description: Approve order (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the order to be approved
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the removed item details
 */
router.post("/order/approve/:id", admin(), (req, res) => {
    ItemController.approveOrder(req, res);
});

module.exports = router;
