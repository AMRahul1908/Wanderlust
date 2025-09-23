const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

main()
.then(()=>{
    console.log("connected to DB");
})

.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust");
}
const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"68bae852cf29395bf79641e0"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
}

initDB();