// const {Book} = require('../db/models')
const check = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect("/login");
  }
};

// const checkUserId = (req, res,next )=>{
  
//    const {id}= req.params
//     const findId = Book.findOne({where:{id})
//     if(req.session.user.id === findId) {
//       next()
//     }else{
//       redirect('/')
//     }
//   }
// }

module.exports = { check}
