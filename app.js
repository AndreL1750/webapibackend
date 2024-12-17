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
            date:{type:Date}
        });

        const MaintenanceModel = mongoose.models.maintenancedbs || mongoose.model("maintenancedbs", MaintenanceSchema);

        let queryAllMaintenance = await MaintenanceModel.find();
        return queryAllMaintenance;
    }
    catch(error){
        console.log(`Error on queryAll ${error}`);
    }
}

app.get('/maintenances', async (request, response) => {
    try {
        let data = await queryAll();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

async function newMaintenance(){
    try{
        let connection = "mongodb://localhost:27017/maintenanceDB";

        await mongoose.connect(connection);
        console.log("Connected To MongoDB Server...");
        
        const MaintenanceSchema = new mongoose.Schema({
            name:{type:String},
            description:{type:String}
        });

        const MaintenanceModel = mongoose.model("maintenancedbs", MaintenanceSchema);

        let newReport = new MaintenanceModel({
            name: "John",
            description: "Oil Change"
        });

        await newReport.save();

        let queryAllMaintenance = await MaintenanceModel.find();
        console.log(queryAllMaintenance);

    }
    catch(error){
        console.log(`Error on queryAll ${error}`);
    }
}

//newMaintenance();
//queryAll();

app.listen(port, ()=> console.log("Server is running on 127.0.0.1:" + port));