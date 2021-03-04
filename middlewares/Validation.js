const Joi = require('joi');

// Login
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(6).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(6)
      .required(),
    id: Joi.string().min(6),
    role: Joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(6).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(6)
      .required(),
  });
  return schema.validate(data);
};

const forgotPassValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(6).max(30).required(),
    newpass: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(6)
      .required(),
  });
  return schema.validate(data);
};

// Class
const createClassValidation = (data) => {
  const schema = Joi.object({
    class_name: Joi.string().min(1).max(30).required(),
    phone_number: Joi.string().regex(new RegExp('^[0-9]*$')).min(6),
  });
  return schema.validate(data);
};

const updateClassValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(30),
    phone_number: Joi.string().regex(new RegExp('^[0-9]*$')).min(6),
    teacherID: Joi.string().min(6),
  });
  return schema.validate(data);
};

// Student
const createStudentValidation = (data) => {
  const schema = Joi.object({
    student_name: Joi.string().min(1).max(30).required(),
    phone_number: Joi.string().min(1).max(30).regex(new RegExp('^[0-9]*$')),
    birthdate: Joi.string()
      .min(1)
      .max(10)
      .regex(new RegExp('^[0-9]*[/-]*[0-9]*[/-]*[0-9]*[/-]*$')),
    address: Joi.string().min(1).max(255),
    class_id: Joi.string().min(1).max(255).required(),
    role: Joi.string(),
  });
  return schema.validate(data);
};

const updateStudentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(30),
    phone_number: Joi.string().min(1).max(30).regex(new RegExp('^[0-9]*$')),
    birthdate: Joi.string()
      .min(1)
      .max(10)
      .regex(new RegExp('^[0-9]*[/-]*[0-9]*[/-]*[0-9]*[/-]*$')),
    address: Joi.string().min(1).max(255),
    classID: Joi.string().allow(null, ''),
  });
  return schema.validate(data);
};

// Teacher
const createTeacherValidation = (data) => {
  const schema = Joi.object({
    teacher_name: Joi.string().min(1).max(30).required(),
    phone_number: Joi.string().min(1).max(30).regex(new RegExp('^[0-9]*$')),
    birthdate: Joi.string()
      .min(1)
      .max(10)
      .regex(new RegExp('^[0-9]*[/-]*[0-9]*[/-]*[0-9]*[/-]*$')),
    address: Joi.string().min(1).max(255),
    role: Joi.string(),
  });
  return schema.validate(data);
};

const updateTeacherValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(30),
    phone_number: Joi.string().min(1).max(30).regex(new RegExp('^[0-9]*$')),
    birthdate: Joi.string()
      .min(1)
      .max(10)
      .regex(new RegExp('^[0-9]*[/-]*[0-9]*[/-]*[0-9]*[/-]*$')),
    address: Joi.string().min(1).max(255),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  forgotPassValidation,
  createClassValidation,
  updateClassValidation,
  createStudentValidation,
  updateStudentValidation,
  createTeacherValidation,
  updateTeacherValidation,
};
