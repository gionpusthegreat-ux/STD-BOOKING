const Studio = require('../models/Studio');

// @desc    Get all studios
// @route   GET /api/studios
// @access  Public
exports.getStudios = async (req, res) => {
  try {
    const { city, studioType, minPrice, maxPrice } = req.query;
    let query = {};

    if (city) query['location.city'] = { $regex: city, $options: 'i' };
    if (studioType) query.studioType = studioType;
    if (minPrice || maxPrice) {
      query.hourlyRate = {};
      if (minPrice) query.hourlyRate.$gte = Number(minPrice);
      if (maxPrice) query.hourlyRate.$lte = Number(maxPrice);
    }

    const studios = await Studio.find(query).populate('owner', 'name phone email');
    res.status(200).json({ success: true, count: studios.length, data: studios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single studio
// @route   GET /api/studios/:id
// @access  Public
exports.getStudio = async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id).populate('owner', 'name phone email');
    if (!studio) {
      return res.status(404).json({ success: false, message: 'Studio not found' });
    }
    res.status(200).json({ success: true, data: studio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create studio
// @route   POST /api/studios
// @access  Private/StudioOwner
exports.createStudio = async (req, res) => {
  try {
    req.body.owner = req.user.id;

    const studio = await Studio.create(req.body);
    res.status(201).json({ success: true, data: studio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update studio
// @route   PUT /api/studios/:id
// @access  Private/StudioOwner
exports.updateStudio = async (req, res) => {
  try {
    let studio = await Studio.findById(req.params.id);

    if (!studio) {
      return res.status(404).json({ success: false, message: 'Studio not found' });
    }

    if (studio.owner.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this studio' });
    }

    studio = await Studio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: studio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete studio
// @route   DELETE /api/studios/:id
// @access  Private/StudioOwner
exports.deleteStudio = async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);

    if (!studio) {
      return res.status(404).json({ success: false, message: 'Studio not found' });
    }

    if (studio.owner.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this studio' });
    }

    await Studio.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Studio deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
