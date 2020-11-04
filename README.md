Resource method
GET     /forums              ->  index
GET     /forums/custom       ->  custom
POST    /forums              ->  create
GET     /forums/:forum       ->  show
GET     /forums/:forum/edit  ->  edit
PUT     /forums/:forum       ->  update
DELETE  /forums/:forum       ->  destroy


jwt token create cmd(custom)
require('crypto').randomBytes(64).toString('hex')


after login 
1.jwt generate,log_id generate ->send to return response. (after getting every api, need to fetch these details)


js empty function

function empty(data)
{
  if(typeof(data) == 'number' || typeof(data) == 'boolean')
  { 
    return false; 
  }
  if(typeof(data) == 'undefined' || data === null)
  {
    return true; 
  }
  if(typeof(data.length) != 'undefined')
  {
    return data.length == 0;
  }
  var count = 0;
  for(var i in data)
  {
    if(data.hasOwnProperty(i))
    {
      count ++;
    }
  }
  return count == 0;
}



time formats
        let time=moment().format('YYYY-MM-DD hh:mm:ss a');
        moment(time).add(30, 'minutes').format('YYYY-MM-DD hh:mm:ss a')


        Api key        : BLwMDmvsPq8JFIkdp0uOa9x75
        Api secret key : pRm4XFWGfnOjE1rQdNnMRGb94nwKnD2no6hMXQTOCBFrXzSWmn
        bearer token   : AAAAAAAAAAAAAAAAAAAAAMpCHgEAAAAAzPmsqLFjqk%2BL4qRzD8byNNNLBY4%3DuqdYbLshQD4FemOmlzF6nsh0VzWLxK5bHuW5SkWacOD6N86AZb
        Access token   : 1303194669312999425-ybX9jhQJGbvug9sncNSNLKOv7QRdIQ
        Access token secret : vSzmTsExO8Zo7RoeR84KQbiIfGLimrPd47DEmtj5vHtXD 