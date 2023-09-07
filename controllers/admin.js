import Admin from '../models/Admin.js';
import Event from '../models/Event.js';
import jwt from 'jsonwebtoken';

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email: email });
      if (!admin) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = (password === admin.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      let token = jwt.sign({id: admin._id},process.env.SECRET_KEY,{expiresIn:100000})
      delete admin.password;
      res.status(200).json({ token, admin });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const event = async (req, res) => {

    try{
        const { name } = req.body;
      console.log(name)
    const existingEvent = await Event.findOne({ name });

    if (existingEvent) {
      return res.status(400).json({ error: "Event with the same name already exists." });
    }

    const newEvent = new Event({
      name,
    });

    await newEvent.save();
    
    res.status(201).json({ message: "Event created successfully", event: newEvent });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
  }

  export const eventDelete = async (req, res) => {
    try {
      const { name } = req.body;
      console.log(name);
  
      const existingEvent = await Event.findOne({ name });
  
      if (!existingEvent) {
        return res.status(404).json({ error: "Event not found." });
      }
  
      await Event.deleteOne({ name });
  
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  export const getAllEvents = async (req, res) => {
    try {
      // Fetch all events from the database
      const events = await Event.find();
      
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  