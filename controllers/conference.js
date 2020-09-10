// Importing Models
const User = require('../models/user');
const Profile = require('../models/profile');
const Event = require('../models/event');
const Conference = require('../models/conference');

// Importing throwError Utility function
const throwError = require('../utility/throwError');
const conference = require('../validators/conference');

//Get stalls of particular event
exports.getConferences = (req, res) => {
  Event.findById(req.params.eventId)
    .populate({
      path: 'registeredConferences',
      populate: {
        path: 'userId',
      },
    })
    .then((event) => {
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      return Promise.all(
        event.registeredConferences.map((conference) => {
          return Profile.findOne({ userId: conference.userId._id })
            .then((profile) => {
              let newConference = {
                ...conference._doc,
                user: profile,
              };
              return newConference;
            })
            .catch((err) => {
              throwError(err, res);
            });
        })
      );
    })
    .then((conferences) => {
      res.status(200).json({ message: 'Success', conferences: conferences });
    })
    .catch((err) => {
      throwError(err, res);
    });
};

//Exhibitor can delete a Conference
exports.deleteConference = (req,res) =>{
  let eventId
  User.findById(req.userId)
  .then((user) =>{
    if (user.role[0]!=='Exhibitor'){
      const error= new Error('Only Exhibitor can delete a conference.')
      error.statusCode = 401
      throw error
    }
    return user
  }
  )
  Conference.findById(req.params.conferenceId)
  .populate("eventId")
  .then((conf)=>{
    if(!conf){
      const error = new Error('Conference not found')
      error.statusCode= 404
      throw error
    }
    let currentdate = Date.now()
    let confDate = conf.eventId.startDate
    console.log(confDate)
    let limitDate = new Date(confDate.setDate(confDate.getDate()-2)).toISOString()
    if(currentdate>limitDate){
      const error = new Error('Time limit Exceeded to delete')
      error.statusCode= 401
      throw error
    }
    eventId = conf.eventId._id
    return Event.findById(eventId) 
  })
  .then((event)=>{
   event.registeredConferences = event.registeredConferences.filter(
     (conferenceId)=>{
        conferenceId.toString() !== req.params.conferenceId.toString()
     }
   )
   return event.save()

  })
  .then((event)=>{
   return Profile.findOne({
      userId : req.userId
    })
  })
  .then((profile)=>{
   let confl=[]
   profile.registeredConferences.forEach((conf)=>{
     if(conf.eventId.toString()===eventId.toString()){
       if(conf.conferenceId.length===2){
         conf.conferenceId = conf.conferenceId.filter((confId)=>
           confId.toString()!==req.params.conferenceId.toString()
         ) 
       confl.push(conf)
       }
     }
     else{
       confl.push(conf)
     }
     
   })
   profile.registeredConferences = confl
   console.log(profile)
   return profile.save() 
  })
  .then((profile)=>{
   return Conference.findByIdAndDelete(req.params.conferenceId)
  })
  .then((conference)=>{
    return res.status(200).json({message : 'Success', conference : conference})
  })
  .catch((err)=>{
    throwError(err, res)
  })
}

// Exhibitor can register a Conference
exports.registerConference = (req, res) => {
  let loadedEvent;
  let loadedProfile;
  let loadedConference;
  Event.findById(req.params.eventId)
    .then((event) => {
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      loadedEvent = event;
      return User.findById(req.userId);
    })
    .then((user) => {
      if (!user.role.includes('Exhibitor')) {
        const error = new Error('Exhibitor can only register for a conference');
        error.statusCode = 401;
        throw error;
      }
      return Profile.findOne({ userId: req.userId });
    })
    .then((profile) => {
      if (
        profile.registeredConferences &&
        profile.registeredConferences.length > 0
      ) {
        profile.registeredConferences.forEach((event) => {
          if (event.eventId.toString() === req.params.eventId.toString()) {
            const error = new Error('You can only register 1 conference');
            error.statusCode = 422;
            throw error;
          }
        });
      }
      loadedProfile = profile;
      const conference = new Conference({
        title: req.body.title,
        theme: req.body.theme,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        seatLimit: req.body.seatLimit,
        userId: req.userId,
        eventId: req.params.eventId,
      });
      return conference.save();
    })
    .then((conference) => {
      loadedConference = conference;
      loadedProfile.registeredConferences.push({
        eventId: req.params.eventId,
        conferenceId: loadedConference._id,
      });
      return loadedProfile.save();
    })
    .then((profile) => {
      loadedEvent.registeredConferences.push(loadedConference._id);
      return loadedEvent.save();
    })
    .then((event) => {
      res
        .status(200)
        .json({ message: 'Success', conference: loadedConference });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};
