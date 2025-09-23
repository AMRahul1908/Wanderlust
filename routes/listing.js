const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const{storage}= require("../cloudConfig.js");
const upload = multer({storage });

router
     .route("/")
     .get(wrapAsync(listingController.index))
     .post(isLoggedIn,validateListing,
          upload.single('listing[image]'),
     wrapAsync(listingController.createListing)
);
//new listing

router.get("/new",isLoggedIn,listingController.newListing);


router
.route("/:id")
     .get(wrapAsync(listingController.showListing))
     .put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing))
     .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing)
);

//edit route

router.get("/:id/edit",
    isLoggedIn,
    isOwner,
     wrapAsync(listingController.editListing));


module.exports = router;