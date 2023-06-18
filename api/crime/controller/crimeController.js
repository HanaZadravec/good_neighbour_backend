const Crime = require("../model/Crime");
const Comment=require("../model/Comment");
exports.createNewCrime = async (req, res, next) => {
    const newCrime = new Crime({
      reporterEmail: req.body.reporterEmail,
      crimeTitle: req.body.crimeTitle,
      crimeAddress: req.body.crimeAddress,
      crimeCity: req.body.crimeCity,
      crimeDesc: req.body.crimeDesc,
      crimeDate: req.body.crimeDate
    });
    console.log(newCrime);
    newCrime.save(err =>{
        if(err){
          console.log(err);
        }
        return res.status(200).json({
          title:"crime created"
        })
      });
  };

exports.getAllCrimes = async (req, res, next) => {
  try {
    const crimes = await Crime.find();
    res.status(200).json(crimes);
  } catch (err) {
    res.status(500).json({ error: "Failed to get crimes" });
  }
};

exports.postComment = async (req, res, next) => {
    const { crimeId, commentText } = req.body;
  
    const newComment = new Comment({
      crimeId,
      commentText,
    });
  
    try {
      const comment = await newComment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Failed to add comment" });
    }
  };
  
  exports.getComments = async (req, res, next) => {
    try {
      const comments = await Comment.find(); // Dohvaćanje svih komentara iz baze podataka
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  };