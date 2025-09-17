const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapasync.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
    

// reviews
// post route for reviews

router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));


// delete route for reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview)
);

module.exports = router;