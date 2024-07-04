const formatRes = (fields, ...allowedFields) => {
  return fields.map((field) => {
    const filteredField = {};
    allowedFields.forEach((key) => {
      if (field[key]) {
        filteredField[key] = field[key];
      }
    });
    return filteredField;
  });
};

module.exports = formatRes;
