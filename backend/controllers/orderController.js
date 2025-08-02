import asyncHandler from '../middleware/asyncHandler'
import models from '../models/orderModels'

// @desc create new order
//@route POST /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
    res.send("add an Item")
})

// @desc get logged in user order
//@route GET api/order/myorder
//@access Private

const getMyOrder = asyncHandler(async (req, res) => {
    res.send("get my orders")

})

//@desc get order by id
//@route POST /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async(req, res) => {
    res.send("get oder by id")
})

//@desc update to paid
//@route GET /api/order/:id/pay
//@access Private

const updateOrderToPaid = asyncHandler(async(req, res) => {
    res.send("update order to paid")
})

//@desc update to delivered
//@route GET /api/order/:id/deliver
//@access Private/Admin

const updateOrderToDelivered = asyncHandler(async(req, res) => {
    res.send("update order to delivered")
})

//@desc get all orders
//@route GET /api/order
//@access Private/Admin

const getOrders= asyncHandler(async(req, res) => {
    res.send("get all orders")
})

export {addOrderItems, 
    getMyOrder, 
    getOrderById, 
    getOrders, 
    updateOrderToDelivered,
    updateOrderToPaid
    }