import express from 'express'
const router = express.Router()
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    uploadProductImage
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

// Public routes
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

// Admin routes (protected)
router.route('/').post(protect, admin, createProduct)
router.route('/:id').put(protect, admin, updateProduct)
router.route('/:id').delete(protect, admin, deleteProduct)

// Image upload route
router.post('/upload', protect, admin, upload.single('image'), uploadProductImage)

export default router