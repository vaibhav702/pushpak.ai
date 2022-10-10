
const rateLimit=require("express-rate-limit")
 const rateLimiterUsingThirdParty = rateLimit({
  windowMs:  60 * 1000, 
  max: 10,
  message: 'You have exceeded the 10 requests in 1 min  limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports.rateLimiterUsingThirdParty=rateLimiterUsingThirdParty