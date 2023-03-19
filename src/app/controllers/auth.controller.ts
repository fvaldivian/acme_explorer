import {Request, Response} from "express";
import {ActorModel} from "../models/actor.model";
import admin from "firebase-admin";

const getActorByToken = async (idToken: any) => {
    console.log("User tokenId " + idToken);
    const firebase = await admin.auth().verifyIdToken(idToken);
    const authTime = firebase.auth_time;
    const exp = firebase.exp;
    const uid = firebase.uid;
    console.log("uid: " + uid);
    console.log("auth_time: " + authTime);
    console.log("exp: " + exp);

    const actor = await ActorModel.findOne({email: uid});
    if (!actor) {
        return null;
    } else {
        console.log("actor: " + actor);
        return actor;
    }
};

const verifyActorByRole = (roles: string[]) => async (req: any, res: Response, callback: any) => {
    console.log("starting verifying idToken");
    console.log("roles: " + roles);
    const idToken = req.header('idtoken');
    console.log("idToken: " + idToken);
    if (!idToken) {
        res.status(401).send('Token Id must be present in request header.');
        return;
    }

    const authenticated = await getActorByToken(idToken);
    console.log('authenticated: ', authenticated);

    if (!authenticated) {
        return res.status(401).send('No actor found with the provided idToken.');
    }

    if (!authenticated.activated) {
        return res.status(401).send('The actor is inactive.');
    }

    const actorRoles: string[] = authenticated.role;
    const isAuth = roles.some(r => actorRoles.includes(r))

    if (isAuth) {
        req.authenticated = authenticated;
        return callback();
    } else {
        res.status(403).send('The actor has not the required roles.');
        return;
    }
};

export {getActorByToken, verifyActorByRole}