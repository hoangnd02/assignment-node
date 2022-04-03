import { Router } from 'express';
import { addCart, list } from '../controllers/cart';
import { checkAuth } from '../middlewares/checkAuth';

const router = Router();

router.post("/cart/:user_id", checkAuth, addCart);
router.get("/cart/:user_id", checkAuth, list);

export default router;