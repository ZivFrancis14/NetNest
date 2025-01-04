const express = require('express');
const router = express.Router();
const scenarioController = require('../controllers/scenario_controller');


router.post('/', (req, res) => scenarioController.create(req, res));
router.get('/', (req, res) => scenarioController.getAll(req, res));
router.get('/:id', (req, res) => scenarioController.getById(req, res));
router.put('/:id', (req, res) => scenarioController.update(req, res));
router.delete('/:id', (req, res) => scenarioController.delete(req, res));



module.exports = router;
