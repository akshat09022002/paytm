const express = require("express");
const zod= require('zod');
const {}

const signupschema= zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string()
})

