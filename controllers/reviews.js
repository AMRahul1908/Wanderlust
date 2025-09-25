const Listing=require("../models/listings.js");
const Reviews=require("../models/reviews.js");

module.exports.createReview = async (req, res) => {

        let listing = await Listing.findById(req.params.id);
        let newReview = new Reviews(req.body.review);
         newReview.author = req.user._id;
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        req.flash("success","New review created");
        res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async (req,res)=>{
    let {id,reviewId} = req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success"," review deleted");

    res.redirect(`/listings/${id}`);
}