const confModel = require('../models/confAPI')

module.exports.addAPI = async (req,res)=>{
    try {
        
        const {label, typeAPI,url,nbServices,securityType,token}=req.body


        const Configuration = new confModel({
            label, typeAPI,url,nbServices,securityType,token
        })

        const confadded = await Configuration.save()

        res.status(200).json(confadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}