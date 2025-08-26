import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../Models/productModel.js'

//@desc Fetch all products
//@routes Get /api/products
//@access public 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//@desc Fetch a products
//@routes Get /api/products/:id
//@access public 
const getProductById = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Resource not Found') 
    }
})

//@desc Create a product
//@routes POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = new Product({
        name,
        price: Number(price),
        user: req.user._id,
        image: image || '/images/sample.jpg',
        brand,
        category,
        countInStock: Number(countInStock),
        numReviews: 0,
        rating: 0,
        description,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc Update a product
//@routes PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name || product.name
        product.price = price ? Number(price) : product.price
        product.description = description || product.description
        product.image = image || product.image
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock ? Number(countInStock) : product.countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc Delete a product
//@routes DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await Product.deleteOne({ _id: product._id })
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc Upload product image
//@routes POST /api/products/upload
//@access Private/Admin
const uploadProductImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400)
        throw new Error('Please upload a file')
    }

    const imageUrl = `/uploads/${req.file.filename}`
    res.json({ 
        message: 'File uploaded successfully',
        imageUrl: imageUrl
    })
})

export {
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    uploadProductImage
}