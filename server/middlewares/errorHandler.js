function errorHandler(err, req, res, next){
    if(err){
        switch(err.name){
            case "SequelizeValidationError":
                let msgErrs = err.errors
                msgErrs = msgErrs.map(msg=>{
                    return msg.message
                })
            res.status(400).json(msgErrs)
            break;

            default:
            res.status(500).json(err)
            break
        }
       res.status(400).json('err')
    }
}

module.exports = errorHandler