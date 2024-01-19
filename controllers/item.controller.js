const express = require("express");
const {
    sendResponse,
    badResponse,
    successResponse,
    errorResponse,
} = require("../helpers/response");
const {
    genHash,
    compareHash,
    genAccessToken,
    genUnique,
} = require("../helpers");
const User = require("../models/users.model");
const Item = require("../models/items.model");
const Order = require("../models/orders.model");

class ItemController {
    async getItems(req, res) {
        try {
            const items = await Item.find();
            return sendResponse(res, 200, items, "Got item successfully");
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async searchItems(req, res) {
        try {
            const items = await Item.find({ name: req.query.name });
            return sendResponse(
                res,
                200,
                items,
                items.length !== 0 ? "Found items" : "Items not found"
            );
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async addToCart(req, res) {
        try {
            const item = await Item.findById(req.params.id);
            const user = await User.findById(req.user.id);
            const cart = user.cart;
            if (cart.includes(item._id)) {
                return badResponse(res, "Item already in cart");
            }
            user.cart.push(item._id);
            await user.save();
            return sendResponse(res, 200, user);
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async removeFromCart(req, res) {
        try {
            const item = await Item.findById(req.params.id);
            const user = await User.findById(req.user.id);
            const cart = user.cart;
            if (!cart.includes(item._id)) {
                return badResponse(res, "Item not in cart");
            }
            user.cart.splice(cart.indexOf(item._id), 1);
            await user.save();
            return sendResponse(
                res,
                200,
                user,
                "Removed Item from cart successfully"
            );
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async getCartItems(req, res) {
        try {
            const user = await User.findById(req.user.id);
            return sendResponse(res, 200, user.cart, "Got all cart items");
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async placeOrder(req, res) {
        try {
            const user = await User.findById(req.user.id);
            const order = await Order.create({
                user: user._id,
                items: user.cart,
                approved: false,
            });
            user.cart = [];
            await user.save();
            return sendResponse(res, 200, user, "Order created successfully");
        } catch (error) {
            return badResponse(res, error);
        }
    }

    // ADMIN CONTROLLERS

    async adminAddItem(req, res) {
        try {
            const item = await Item.create(req.body);
            return sendResponse(res, 200, item);
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async adminUpdateItem(req, res) {
        try {
            const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });

            if (!item) {
                return badResponse(res, "Item not found");
            }

            return sendResponse(res, 200, item, "Item updated successfully");
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async adminRemoveItem(req, res) {
        try {
            const item = await Item.findByIdAndDelete(req.params.id);
            if (!item) {
                return badResponse(res, "Item not found");
            }
            return sendResponse(res, 200, item);
        } catch (error) {
            return badResponse(res, error);
        }
    }

    async adminApproveOrder(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return badResponse(res, "Order not found");
            }
            order.approved = true;
            await order.save();
            return sendResponse(res, 200, order, "Order approved successfully");
        } catch (error) {
            return badResponse(res, error);
        }
    }
}

module.exports = new ItemController();
