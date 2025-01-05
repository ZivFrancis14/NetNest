// const Joi = require('joi');

class BaseController {
    constructor(model, validationSchema) {
        this.model = model;
        this.validationSchema = validationSchema; // Pass schema to the controller
    }

    async create(req, res){
        try{
            const item = await this.model.create(req.body);
            res.status(201).json({item});
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating item', error });
        }
    }

    async getAll(req, res){
        try{
            const items = await this.model.find();
            res.status(200).json({items});
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting items', error });
        }
    }
    async getById(req, res){
        try{
            const item = await this.model.findById(req.params.id);
            if(!item){
                return res.status(404).json({message: 'Item not found'});
            }
            res.status(200).json({item});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message: 'Error fetching item', error});

        }
    }
    async update(req, res){
        try{
            const item = await this.model.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!item){
                return res.status(404).json({message: 'Item not found'});
            }
            res.status(200).json({item});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message: 'Error updating item', error});
        }
    }
    async delete(req, res){
        try{
            const item = await this.model.findByIdAndDelete(req.params.id);
            if(!item){
                return res.status(404).json({message: 'Item not found'});
            }
            res.status(200).json({item});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message: 'Error deleting item', error});
        }
    }


}

export default BaseController;