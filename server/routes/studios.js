const express = require('express');
const router = express.Router();
const {
  getStudios,
  getStudio,
  createStudio,
  updateStudio,
  deleteStudio
} = require('../controllers/studioController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getStudios);
router.get('/:id', getStudio);
router.post('/', protect, authorize('studio_owner', 'admin'), createStudio);
router.put('/:id', protect, authorize('studio_owner', 'admin'), updateStudio);
router.delete('/:id', protect, authorize('studio_owner', 'admin'), deleteStudio);

module.exports = router;
