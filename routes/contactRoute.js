const express = require("express");
const contactModel = require("../models/contactModel");
const contactRoute = express.Router();

//Creating new contact endpoint
contactRoute.post("/contacts", async (req, res) => {
  try {
    const { email } = req.body;
    //check if the contact already exist
    const isExist = await contactModel.findOne({ email: email });
    if (isExist) {
      return res.json({
        success: false,
        message: "This contact already exist",
      });
    }
    const contact = await contactModel.create(req.body);
    return res.json({
      success: true,
      message: "Contact created successfully",
      contact,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in creating contact",
      error,
    });
  }
});

//Fetching all contacts endpoint
contactRoute.get("/contacts", async (req, res) => {
  try {
    const { search, sort } = req.query;
    let contacts;
    if (search || sort) {
      contacts = await contactModel
        .find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        })
        .sort(sort);
    } else {
      contacts = await contactModel.find();
    }
    return res.json({ success: true, contacts });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in fetching contacts",
      error,
    });
  }
});


//Fetching single contacts byId endpoint
contactRoute.get("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await contactModel.findById(id);
    return res.json({ success: true, contact });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in fetching contact",
      error,
    });
  }
});

//Updating contacts byId endpoint
contactRoute.put("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await contactModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json({ success: true, message: "Contact updated", contact });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in updating contact",
      error,
    });
  }
});

//Deleting contacts byId endpoint
contactRoute.delete("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await contactModel.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Contact deleted",
      deleteContact: contact,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in deleting contact",
      error,
    });
  }
});

module.exports = contactRoute;
