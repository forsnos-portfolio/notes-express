'use strict';

const {StatusCodes} = require('http-status-codes');
const {NotFoundError, ForbiddenError} = require('../errors/httpErrors');
const {validator} = require('../lib/validator');
const {credentials, refreshToken} = require('../validators/security');
const {genSalt, hash, compare} = require('bcrypt');
const {user, session} = require('../models');
const {jwtService} = require('../lib/jwt');
const {hasRole} = require('../lib/roles');

const router = require('express').Router();

router.post('/signUp', [validator(credentials), hasRole('anonymous')], async (req, res, next) => {
    const salt = await genSalt(10);
    const hashPassword = await hash(req.validated.password, salt);
    const result = await user.create({email: req.validated.email, hashPassword: hashPassword}, {
        returning: ['guid']
    });
    const token = await jwtService.login({sub: result.guid});
    return res.status(StatusCodes.CREATED).json(token).end();
});

router.post('/signIn', [validator(credentials), hasRole('anonymous')], async (req, res, next) => {
    try {
        const result = await user.findOne({
            attributes: ['guid', 'hashPassword'],
            where: {email: req.validated.email}
        });
        if (result === null) throw new NotFoundError();
        const isMath = await compare(req.validated.password, result.hashPassword);
        if (!isMath) throw new ForbiddenError();
        const token = await jwtService.login({sub: result.guid});
        return res.status(StatusCodes.OK).json(token).end();
    } catch (e) {
        next(e);
    }
});

router.post('/signIn', [validator(credentials), hasRole('anonymous')], async (req, res, next) => {
    try {
        const result = await user.findOne({
            attributes: ['guid', 'hashPassword'],
            where: {email: req.validated.email}
        });
        if (result === null) throw new NotFoundError();
        const isMath = await compare(req.validated.password, result.hashPassword);
        if (!isMath) throw new ForbiddenError();
        const token = await jwtService.login({sub: result.guid});
        return res.status(StatusCodes.OK).json(token).end();
    } catch (e) {
        next(e);
    }
});

router.post('/refresh', [validator(refreshToken), hasRole('anonymous')], async (req, res, next) => {
    try {
        const decoded = await jwtService.verifyRefresh(req.validated.refreshToken);
        const exist = await session.findByPk(req.validated.refreshToken);
        if (exist != null) throw new ForbiddenError();
        if (decoded === null) throw new ForbiddenError();
        const token = await jwtService.login({sub: decoded.sub});
        return res.status(StatusCodes.OK).json(token).end();
    } catch (e) {
        next(e);
    }
});

router.post('/logout', [validator(refreshToken), hasRole('anonymous')], async (req, res, next) => {
    try {
        await session.create({refreshToken: req.validated.refreshToken});
        return res.header('location', '/').status(StatusCodes.NO_CONTENT).end();
    } catch (e) {
        next(e);
    }
})

module.exports = router;

