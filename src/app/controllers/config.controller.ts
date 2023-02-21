import { Request, Response } from "express";
import configModel from "../models/config.model";

class ConfigController {
  
  public addConfiguration = async (req: Request, res: Response) => {
    if (!req.body.cache_time || !req.body.dashboard_time || !req.body.search_result || !req.body.sponsorship_price) {
      return res
        .status(400)
        .json({ msg: "Please, insert a valid configuration" });
    }
    try {
      const newConfig = new configModel(req.body);
      await newConfig.save();
      return res.status(201).json(newConfig);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public getConfiguration = async (_req: Request, res: Response) => {
    try {
      const configFinded = await configModel.findOne({});
      return res.send(configFinded);
    } catch (error) {
      res.send(error);
    }
  };

  public updateConfiguration = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cache_time, dashboard_time, search_result, sponsorship_price } =
      req.body;
    if(cache_time < 60 || cache_time > 1440){
      return res.status(400).json({msg: "Introduce a valid cache time"})
    }
    try {
      const configToUpdate = await configModel.updateOne(
        { _id: id },
        {
          cache_time,
          dashboard_time,
          search_result,
          sponsorship_price,
        }
      );
      if (configToUpdate.matchedCount === 0) {
        return res.status(404).send("Configuration not found");
      } else return res.send(configToUpdate);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public updateCacheTime = async (req: Request, res: Response) => {
    // to-do check user authenticated is an administrator
    const {id} = req.params
    const {cache_time} = req.body
    if(cache_time < 60 || cache_time > 1440 || typeof cache_time !== 'number'){
      return res.status(400).send("Invalid cache time value")
    }
    try{
        const actor = await configModel.findOneAndUpdate(
                {_id: id},{$set: {cache_time}},{new: true});
            if (actor) {
                res.status(200).json(actor);
            } else {
                res.status(404).send("Config not found");
            }
        }
        catch (err: any) {
        if(err.kind === 'ObjectId'){
            return res.status(400).send({msg: "ObjectId is not correct"})
        }else if (err.name === "ValidationError") {
            res.status(422).send(err);
        }
        res.status(500).send(err);
    }
  }

  public updateSearchResult = async (req: Request, res: Response) => {
    // to-do check user authenticated is an administrator
    const {id} = req.params
    const {search_result} = req.body
    if(search_result < 0 || search_result > 100 || typeof search_result !== 'number'){
      return res.status(400).send("Invalid search result value")
    }
    try{
        const actor = await configModel.findOneAndUpdate(
                {_id: id},{$set: {search_result}},{new: true});
            if (actor) {
                res.status(200).json(actor);
            } else {
                res.status(404).send("Config not found");
            }
        }
        catch (err: any) {
        if(err.kind === 'ObjectId'){
            return res.status(400).send({msg: "ObjectId is not correct"})
        }else if (err.name === "ValidationError") {
            res.status(422).send(err);
        }
        res.status(500).send(err);
    }
  }

  public updateSponsorshipPrice = async (req: Request, res: Response) => {
    // to-do check user authenticated is an administrator
    const {id} = req.params
    const {sponsorship_price} = req.body
    if(sponsorship_price < 0 || typeof sponsorship_price !== 'number'){
      return res.status(400).send("Invalid search result value")
    }
    try{
        const actor = await configModel.findOneAndUpdate(
                {_id: id},{$set: {sponsorship_price}},{new: true});
            if (actor) {
                res.status(200).json(actor);
            } else {
                res.status(404).send("Config not found");
            }
        }
        catch (err: any) {
        if(err.kind === 'ObjectId'){
            return res.status(400).send({msg: "ObjectId is not correct"})
        }else if (err.name === "ValidationError") {
            res.status(422).send(err);
        }
        res.status(500).send(err);
    }
  }
}

export default ConfigController;
