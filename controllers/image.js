const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'b295d8e3ca1e446d8a857d63073f8e37'
});

const handleApiCall = (req, res) => {
   app.models
     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data => {
     	res.json(data);
     })
     .catch(err => res.status(400).json('API ERROR'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entrie => {
        res.json(entrie[0]);
    })
    .catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};