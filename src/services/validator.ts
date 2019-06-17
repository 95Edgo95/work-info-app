export default (fields, validationSchemas) => {
  const errors = {};

  Object.keys(fields).forEach((fieldKey) => {
    const schemas = validationSchemas[fieldKey];
    const field = fields[fieldKey];

    if (!schemas) {
      return;
    }

    for (let schema of schemas) {
      const {type, option, message} = schema;
      const isValid = validate(field, type, option, fields);

      if (!isValid) {
        errors[fieldKey] = message;
        break;
      }
    }
  });

  return errors;
}

function validate(value, type, option, fields) {
  switch (type) {
    case "required":
      return !!value;

    case "regex":
      return value.match(option);

    case "is18+": {
      const date = new Date(value);

      return new Date(date.getFullYear() + 18, date.getMonth(), date.getDate()) <= new Date();
    }

    case "is-before": {
      const date = new Date(value);
      const endDate = new Date(fields[option]);

      return endDate > date;
    }

    case "is-after": {
      const date = new Date(value);
      const startDate = new Date(fields[option]);

      return startDate < date;
    }

    default:
      return true;
  }
}
