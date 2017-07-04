import Ajv from 'ajv';

const validateSchema = (schema, json) => {
  if (!schema) {
    throw new Error('Missing validation schema');
  }
  const ajv = new Ajv();
  const validator = ajv.compile(schema);
  return validator(json);
};

export default validateSchema;
