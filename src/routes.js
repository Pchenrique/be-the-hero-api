const express = require('express');
const { celebrate, Segments, Joi} = require('celebrate');

const OngCrontroller = require('./controllers/OngController');
const IncidentsCrontroller = require('./controllers/IncidentController');
const ProfileCrontroller = require('./controllers/ProfileController');
const SessionCrontroller = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}),SessionCrontroller.create);

routes.get('/ongs', OngCrontroller.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),OngCrontroller.create);

routes.get('/incidents', IncidentsCrontroller.index);

routes.post('/incidents', 
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required(),
        })
    }), 
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }),
IncidentsCrontroller.create);

routes.delete('/incidents/:id', 
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }),
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }),
IncidentsCrontroller.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),ProfileCrontroller.index);

module.exports = routes;