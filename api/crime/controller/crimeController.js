const Crime = require("../model/Crime");

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
