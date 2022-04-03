import { Router } from 'express';
import { create, edit, list, read, remove } from '../controllers/category';
import { checkAuth } from '../middlewares/checkAuth';

const router = Router();

router.post("/category", checkAuth, create);
router.get("/categories", checkAuth, list);
router.get("/category/:id", checkAuth, read);
router.patch("/category/:id", checkAuth, edit);
router.delete("/category/:id", checkAuth, remove);

export default router;