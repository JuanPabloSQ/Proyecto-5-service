import { Router } from 'express';
import mercadopago from 'mercadopago';

const router = Router();

mercadopago.configure({
  access_token:
    'TEST-2718035114804464-050915-7b3be7691c440cff9ca751ef28a7015e-1805736504',
});

router.post('/', async (req, res) => {
  try {
    const preference = req.body;
    const responseMP = await mercadopago.preferences.create(preference);
    console.log(responseMP);
    res.json({ checkoutId: responseMP.body.id });
  } catch (error) {
    console.error('Error al crear la preferencia de MercadoPago:', error);
    res.status(500).json({
      message:
        'Error interno del servidor al crear la preferencia de MercadoPago',
    });
  }
});

export default router;
