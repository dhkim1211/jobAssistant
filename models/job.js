var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    username: String,
    jobtitle: String,
    company: String,
    location: String,
    description: String,
    comments: String,
    haveapplied: Boolean,
    followupdate: Date,
    contact: String,
    url: String,
    createdAt: Date,
    updatedAt: Date
});

// on every save, add the date
jobSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;