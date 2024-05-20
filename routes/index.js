import { Router } from 'express';

const router = Router();

router.get('/', function (req, res, next) {
  res.send('[{ name: "plants", image: "http://image.com" }]');
});

export default router;
