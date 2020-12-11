'use strict';

const {StatusCodes} = require('http-status-codes');
const {validator} = require('../lib/validator');
const {query, guid, createNote, updateNote} = require('../validators/notes');
const {note} = require('../models');
const {hasRole} = require('../lib/roles');
const {NotFoundError} = require('../errors/httpErrors');

const router = require('express').Router();
const crypto = require('crypto');

router.get('/share/:guid', [validator(Object.assign(guid, query)), hasRole('anonymous')], async (req, res, next) => {
    try {
        const result = await note.findOne({where: {share: req.validated.guid}});
        if (result == null) throw new NotFoundError();
        return res.status(StatusCodes.OK).json(result).end();
    } catch (e) {
        next(e);
    }
});

router.post('/share', [validator(guid), hasRole('authorize')], async (req, res, next) => {
    try {
        const hash = crypto.randomBytes(20).toString('hex');
        await note.update({share: hash}, {where: {guid: req.validated.guid}});
        return res.status(StatusCodes.CREATED)
            .header('location', 'https://notes/share/' + hash)
            .json({
                guid: hash
            })
            .end();
    } catch (e) {
        next(e);
    }
});

router.get('/', [validator(query), hasRole('authorize')], async (req, res, next) => {
    try {
        const result = await note.findAndCountAll({
            offset: req.validated.offset,
            limit: req.validated.limit
        });

        return res.status(StatusCodes.OK).json(result).end();
    } catch (e) {
        next(e);
    }
});

router.get('/:guid', [validator(guid), hasRole('authorize')], async (req, res, next) => {
    try {
        const result = await note.findByPk(req.validated.guid);
        if (result == null) throw new NotFoundError();
        return res.status(StatusCodes.OK).json(result).end();
    } catch (e) {
        next(e);
    }
});

router.post('/', [validator(createNote), hasRole('authorize')], async (req, res, next) => {
    try {
        const result = await note.create({note: req.validated.note, user_id: req.user.sub}, {
            returning: ['guid']
        });

        return res.status(StatusCodes.CREATED).json(result).end();
    } catch (e) {
        next(e);
    }
});

router.put('/', [validator(updateNote), hasRole('authorize')], async (req, res, next) => {
    try {
        await note.update(req.validated, {where: {guid: req.validated.guid}});
        return res.status(StatusCodes.NO_CONTENT).end();
    } catch (e) {
        next(e);
    }
});

router.delete('/:guid', [validator(guid), hasRole('authorize')], async (req, res, next) => {
    try {
        const result = await note.destroy({where: {guid: req.validated.guid}});
        if (result === 0) throw new NotFoundError();
        return res.status(StatusCodes.NO_CONTENT).end();
    } catch (e) {
        next(e);
    }
});


module.exports = router;

