import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('[{ name: "institucion2", image: "http://image.com" }]');
});

export default router;