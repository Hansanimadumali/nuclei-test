const Joi = require("joi");

const _name = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

const _telephone = Joi.object({
  telephone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

const _email = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const validateName = (name) => {
  try {
    const value = _name.validate({ name: name });
    return value;
  } catch (err) {
    
  }
};

const validateEmail = (email) => {
  try {
    const value = _email.validate({ email: email });
    return value;
  } catch (err) {
    
  }
};

const validateTelephone = (telephone) => {
  try {
    const value = _telephone.validate({ telephone: telephone });
    return value;
  } catch (err) {
   
  }
};

validateName("dd")
export { validateName, validateEmail, validateTelephone };
