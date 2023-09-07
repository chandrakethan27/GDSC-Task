import User from '../models/user.js';
import Event from '../models/Event.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      console.log(req.body)
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ message: "Invalid Username" });
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)
      if (!isMatch) return res.status(400).json({ message: "Invalid Password" });
      let token = jwt.sign({id: user._id},process.env.SECRET_KEY,{expiresIn:10000})
      console.log(token)
      res.status(200).json({message:"Success",payload:{token,email}})
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

    export const event = async (req, res) => {
        try{

            const {name, id} = req.body; 
            console.log(req.body)
            const event = await Event.findOne({name: name});
      
            if (!event) {
              return res.status(404).json({ error: "Event not found" });
            }

            if (event.attendees.includes(id)) {
              return res.status(400).json({ error: "User is already registered for this event" });
            }

            event.attendees.push(id);

            await event.save();
        
            res.status(200).json({ message: "User registered for the event" });

        }catch(err){
            res.status(500).json({ error: err.message });
        }
    }