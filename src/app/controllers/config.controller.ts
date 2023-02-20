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
}

export default ConfigController;
