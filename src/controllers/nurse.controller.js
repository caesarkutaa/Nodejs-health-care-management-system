const Nurse = require('../models/nurse.model')



const createNurse = async (req, res) =>{
    const { email } = req.body
    // Check we have an email
    if (!email) {
       return res.status(422).send({ message: "Missing email." });
    }
    try {
        const existingEmail= await Nurse.findOne({ email }).exec();
     if (existingEmail) {
        return res.status(409).send({ 
              message: "Email is already in use."
        });
    } 
        const nurse = await Nurse.create({...req.body});
        res.status(201).json(nurse);
      } catch (error) {
        res.status(400).json({ error: 'Could not create nurse' });
      }
}


///login admin
const loginNurse = async (req, res) => {
    ///checking if the admin has email and password
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(403).json("please provide email and password");
    }
    const nurse = await Nurse.findOne({ email });
    //checking if there is a admin
    if (!nurse) {
      res.status(403).json("Invalid Nurse");
    }
    ///checking if the admin password is correct by using bcrypt.compare
    const ispasswordcorrect = await nurse.checkpassword(password);
    if (!ispasswordcorrect) {
      res.status(403).json("Invalid Password");
    }
    //sending the admin name and token
    const token = nurse.creatjwt();
    res.status(201).json({ nurse: { name: nurse.firstname }, token });
  };



const getAllNurse = async (req, res) =>{
    try {
        const nurses = await Nurse.find();
        res.json(nurses);
      } catch (error) {
        res.status(500).json({ error: 'Could not retrieve nurses' });
      }
    
}

const getOneNurse = async (req, res) =>{
    const {id:nurseID}= req.params
    try {
        const nurse = await Nurse.findOne({_id:nurseID})
        if(!nurse){
            return res.status(404).json({msg:`no patient with the id found : ${nurseID}`})
           }
           res.status(200).json({nurse})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateNurse = async (req, res) =>{
    const {id:nurseID} = req.params
    try {
        const nurse = await Nurse.findOneAndUpdate({_id:nurseID},req.body,{
            new:true,
            runValidators:true
        })
            res.status(200).json({nurse})
        } catch (error) {
            res.status(500).json({msg:error})
     }
}

const deleteNurse = async (req, res) =>{
    const {id:nurseID} = req.params
    try {
        const nurse= await Nurse.findByIdAndDelete({_id:nurseID})
        if(!nurse){
            return res.status(404).json({msg:`no patient with the id found : ${nurseID}`})
        }
             req.status(200).json({msg:'Account deleted Successfully'})
            // req.status(200).send()
    } catch (error) {
            res.status(404).json({msg:error})
    }
}

module.exports ={
    createNurse,
    loginNurse,
    getAllNurse,
    getOneNurse,
    updateNurse,
    deleteNurse
}