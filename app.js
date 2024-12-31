const express = require('express');
const app = express();
const port = 3030;
const mongoose = require("mongoose");

async function queryAll(){
    try{
        let connection = "mongodb://localhost:27017/maintenanceDB";

        await mongoose.connect(connection);
        console.log("Connected To MongoDB Server...");
        
        const MaintenanceSchema = new mongoose.Schema({
            plate:{type:String},
            name:{type:String},
            description:{type:String},
            distance:{type:String},
            route:{type:String},
            date:{type:Date}
        });

        const MaintenanceModel = mongoose.models.maintenancedbs || mongoose.model("maintenancedbs", MaintenanceSchema);

        let queryAllMaintenance = await MaintenanceModel.find();
        console.log(queryAllMaintenance);
        return queryAllMaintenance;
    }
    catch(error){
        console.log(`Error on queryAll ${error}`);
    }
}

async function queryMaintenance(filter) {
    try {
        const connection = "mongodb://localhost:27017/maintenanceDB";

        await mongoose.connect(connection);
        console.log("Connected To MongoDB Server...");

        const MaintenanceSchema = new mongoose.Schema({
            plate: { type: String },
            worker: { type: String },
            description: { type: String },
            distance: { type: String },
            route: { type: String },
            date: { type: Date }
        });

        const MaintenanceModel = mongoose.models.maintenancedbs || mongoose.model("maintenancedbs", MaintenanceSchema);

        const results = await MaintenanceModel.find(filter);
        return results;
    } catch (error) {
        console.error(`Error querying maintenance: ${error}`);
        throw error;
    }
}

app.use(express.json());

app.get('/maintenances', async (request, response) => {
    try {
        let data = await queryAll();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/maintenances/plate/:plate', async (request, response) => {
    try {
        const Plate = request.params.plate;
        const data = await queryMaintenance({ Plate });
        response.status(200).json(data);
    } catch (error) {
        console.error(`Error in /plate route: ${error}`);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/maintenances/worker/:worker', async (request, response) => {
    try {
        const Worker = request.params.worker;
        const data = await queryMaintenance({ Worker });
        response.status(200).json(data);
    } catch (error) {
        console.error(`Error in /worker route: ${error}`);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/maintenances', async (request, response) => {
    console.log("Request Body:", request.body);

    try {
        const { plate, worker, description, distance, route, date } = request.body;

        const connection = "mongodb://localhost:27017/maintenanceDB";
        await mongoose.connect(connection);

        const MaintenanceSchema = new mongoose.Schema({
            plate: { type: String },
            worker: { type: String },
            description: { type: String },
            distance: { type: String },
            route: { type: String },
            date: { type: String }
        });

        const MaintenanceModel = mongoose.models.maintenancedbs || mongoose.model("maintenancedbs", MaintenanceSchema);

        const newMaintenance = new MaintenanceModel({
            plate,
            worker,
            description,
            distance,
            route,
            date
        });

        const savedMaintenance = await newMaintenance.save();

        response.status(201).json(savedMaintenance.toObject());
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, ()=> console.log("Server is running on 127.0.0.1:" + port));