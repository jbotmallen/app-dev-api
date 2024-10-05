const sanitizeData = (schema, data) => {
  const sanitizedData = schema.validate(data);
  return sanitizedData;
};

module.exports = {
  sanitizeData,
};
