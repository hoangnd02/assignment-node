import { Router } from 'express';
import { userById } from '../controllers/auth';
import { create, list, read, remove, search, update} from '../controllers/product';
import { isAuth, requiredSignin, checkAuth } from '../middlewares/checkAuth' 
const router = Router();

// resful API
router.get('/products', checkAuth, list);
router.get('/product/:id', checkAuth, read);
router.post('/products/:userId', requiredSignin, isAuth, create);
router.delete('/product/:id', checkAuth, remove);
router.patch("/product/:id", checkAuth, update);
router.get("/product", search);

router.param("userId", userById)

export default router;