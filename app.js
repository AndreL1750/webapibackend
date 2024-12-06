const mongoose = require("mongoose");

async function queryAll(){
    try{
        let connection = "mongodb://localhost:27017/maintenanceDB";

        await mongoose.connect(connection);
        console.log("Connected To MongoDB Server...");
        
        const MaintenanceSchema = new mongoose.Schema({
            name:{type:String},
            description:{type:String}
        });

        const MaintenanceModel = mongoose.model("maintenancedbs", MaintenanceSchema);

        let queryAllMaintenance = await MaintenanceModel.find();
        console.log(queryAllMaintenance);
    }
    catch(error){
        console.log(`Error on queryAll ${error}`);
    }
}

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

newMaintenance();
//queryAll();