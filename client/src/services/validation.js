// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation - requires letters, numbers, min 6 chars
export const isValidPassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    return { valid: false, message: 'Password must contain both letters and numbers' };
  }
  return { valid: true, message: '' };
};

// Phone validation - basic check for length
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{7,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Name validation
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Validate registration form
export const validateRegistrationForm = (formData) => {
  const errors = {};

  if (!isValidName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const passwordValidation = isValidPassword(formData.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.message;
  }

  if (!isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
};

// Validate login form
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.password || formData.password.length === 0) {
    errors.password = 'Password is required';
  }

  return errors;
};

// Validate booking form
export const validateBookingForm = (formData) => {
  const errors = {};

  if (!formData.bookingDate) {
    errors.bookingDate = 'Please select a date';
  }

  if (!formData.startTime) {
    errors.startTime = 'Please select a start time';
  }

  if (!formData.endTime) {
    errors.endTime = 'Please select an end time';
  }

  if (formData.startTime && formData.endTime) {
    const start = new Date(`2000-01-01 ${formData.startTime}`);
    const end = new Date(`2000-01-01 ${formData.endTime}`);
    if (end <= start) {
      errors.endTime = 'End time must be after start time';
    }
  }

  if (!formData.purpose || formData.purpose.trim().length < 3) {
    errors.purpose = 'Purpose must be at least 3 characters';
  }

  return errors;
};

// Validate studio form
export const validateStudioForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 3) {
    errors.name = 'Studio name must be at least 3 characters';
  }

  if (!formData.studioType) {
    errors.studioType = 'Please select a studio type';
  }

  if (!formData.capacity || formData.capacity < 1) {
    errors.capacity = 'Capacity must be at least 1';
  }

  if (!formData.hourlyRate || formData.hourlyRate < 0) {
    errors.hourlyRate = 'Hourly rate must be a positive number';
  }

  if (!formData.location?.city || formData.location.city.trim().length === 0) {
    errors.city = 'City is required';
  }

  if (!formData.location?.address || formData.location.address.trim().length < 3) {
    errors.address = 'Address must be at least 3 characters';
  }

  if (!formData.location?.phone || !isValidPhone(formData.location.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
};
