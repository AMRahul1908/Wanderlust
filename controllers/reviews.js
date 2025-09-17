const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.newReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews (req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","new review created");

    // console.log("new review saved");
    // res.send("review added successfully");

    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async (req,res)=>{
    let {id,reviewsId} = req.params;
    Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewsId}});
    await Review.findByIdAndDelete(reviewsId);
    req.flash("success"," review deleted");

    res.redirect(`/listings/${id}`);
}