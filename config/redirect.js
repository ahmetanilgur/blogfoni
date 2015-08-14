/**
* A module to refresh the page or redirect it back to the index page
*/

module.exports=function (req,res,next){
	res.redirect('../');
}