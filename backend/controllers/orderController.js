import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../Models/orderModel.js'

// @desc create new order
//@route POST /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
    // res.send("add an Item")

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice, 
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length == 0) {
        res.status(400)
        throw new Error("No order items")
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createOrder = await order.save()
        
        res.status(201).json(createOrder)
        
    }

})

// @desc get logged in user order
//@route GET api/order/myorder
//@access Private

const getMyOrder = asyncHandler(async (req, res) => {
    // res.send("get my orders")

    const orders = await Order.find({ user: req.user._id})
    res.status(200).json(orders)

})

//@desc get order by id
//@route POST /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async(req, res) => {
    // res.send("get oder by id")
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.status(200).json(order)
    }else{
        res.status(404)
        throw new Error('Order Not Found')
    }
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