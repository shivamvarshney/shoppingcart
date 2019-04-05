// Express Framework
var express = require('express');
// Mongoose
var mongoose = require('mongoose');
// Body Parser
var bodyParser = require('body-parser');
// Form Data
var formdata = require('form-data');
// JSON Web Token
var jsonWebToken = require('jsonwebtoken');
// Create Server
var app = express();
// File Upload Package
fileUpload = require('express-fileupload')
// Get the data in query parameters, post request and header data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));
// Use Models as Collections
var users = require('./models/users.js');
var roles = require('./models/roles.js');
var categories = require('./models/categories.js');
var rates = require('./models/rates.js');
var products = require('./models/products.js');
var kart_history = require('./models/kart_history.js');
var product_ratting = require('./models/product_ratting.js');
//var imageUpload = require('./uploadingCode/productimageupload');
// JWT secret Key
var privateShoppingKartSecretKey = 'c2hvcHBpbmdfY*2FydF9qc2%9uX3NlY3J!ldF9rZXlfd2l0aF=9udW1lcmljX2tleQ';
// Connect String with Mongo DB
//mongodb://localhost/shoppingCart
//mongodb+srv://shivamvarshney0710:<password>@cluster0-12h6r.mongodb.net/test?retryWrites=true
mongoose.connect('mongodb+srv://shivamvarshney0710:Classic@982@cluster0-12h6r.mongodb.net/shoppingCart?retryWrites=true',{
	userMongoClient :true
})
// Server connection at PORT 3000
app.listen('3000',function(){
	console.log('Magic Happens here');
});
// CORS validating
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// Upload Image with specific path
//app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
// Image upload Code 
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('fileUpload');
// End of the code  of Image upload Code 

// Routes with Callbacks

// Route with Middleware
//app.post('/addproduct',jsontokenvalidator,addproducts);
// End user routes
app.post('/login',login);
app.post('/signup',signup);
app.post('/addproduct',addproducts);
app.get('/products',jsontokenvalidator,getAllEnabledProducts);
app.post('/addProductToHistory',addProductToHistory);
app.post('/addProductRating',jsontokenvalidator,addProductRating);
app.post('/productPayment',productPayment);
app.post('/getProductHistory',getProductHistory);
app.post('/getProducts',getAllProducts);
app.post('/getCartProducts',getCartProducts);
app.post('/getUserPaidProducts',getUserPaidProducts);
app.post('/bulkPayment',bulkPayment);
app.post('/feedback',feedback);
app.post('/highrateditems',highrateditems);
// Admin Routes
app.get('/categories',getCategories);
app.post('/categorieswithproducts',getAllCategoriesWithItsProducts);
app.post('/addcategory',addcategory);
app.post('/getAdminProducts',getAllAdminProducts);
app.post('/productActivation',productActivation);
app.post('/productDeletion',productDeletion);
app.post('/productCategoryDeletion',productCategoryDeletion);
app.post('/productCategoryActivation',productCategoryActivation);
app.post('/upload',uploadFile);

// Upload Image Code using Multer
function uploadFile(req,res){	
	upload(req,res,function(err) {
		if(err) {
			res.status(500).send(err);				
		}
		res.status(200).send("File is uploaded");		
	});
}
// Get the file extension by appending . and extension name
function getExtension(filename) {
	var i = filename.lastIndexOf('.');
	return (i < 0) ? '' : filename.substr(i);
}
// Get all admin products
function getAllAdminProducts(req,resp){
	var limit = req.body.limit;
	var offset = req.body.offset;
	var category = req.body.category;
	products.aggregate([
     { $lookup: {from: "rates", localField: "_id", foreignField: "product_id", as: "ratesData"} },
     { $lookup: {from: "categories", localField: "category", foreignField: "_id", as: "categoryData"} },
     { $lookup: {from: "users", localField: "created_by", foreignField: "_id", as: "createdBy"} },
	   { $match: { 'is_delete': false } },
		 { $sort : { 'created_on': -1 } }
	],function (error, data) {
        if(!error){
		   		resp.status(200).send(data);
				}else{
					resp.status(500).send('Something went wrong');
				}
    });
}
// Add product Callback function
function addproducts(req,resp){
	var name = req.body.p_name;
	var description = req.body.p_description;	  
	var amount = req.body.p_amount;
	var category = req.body.p_category;
	var created_by = req.body.user_id;
	var prod_obj = {'name':name,'description':description,'category':category,'created_by':created_by}
  var productdata = new products(prod_obj);
	productdata.save().then(product=>{		  		 
	    var rateObj = {'amount':amount,'product_id':product._id}
			var rate_obj = new rates(rateObj);
			rate_obj.save().then(rate=>{
				if (Object.keys(req.files).length > 0) {
					let sampleFile = req.files.fileUpload;		
					var img_name=sampleFile.name;
					var extension = getExtension(img_name);
					let customFileName = product._id+extension;
					sampleFile.mv('public/images/upload_images/'+customFileName, function(err) {                             
						if(err){
							console.log('Upload error');
						}else{
							products.findById(product._id,(err,productInfo)=>{
								if(!err){				
									productInfo.productImage = product._id+extension;
									productInfo.save();									
								}									
							});
						}
					});
				}
				var responseObect = {'rate':rate,'products':product,'message':'Product Saved successfully'};				
				resp.status(200).send(responseObect);
			}); 		
	}).catch(err=> {
		resp.status(500).send('Unable to save data');
	});	  	 
}
// Request with Async and Await
app.post('/getProductsUsingAsync',async (req,resp)=>{
	var limit = req.body.limit;
	var offset = req.body.offset;
	var category = req.body.category;
	let passingInfo = {'limit':limit,'category':category,'offset':offset};
	console.log('response');
	try{
		let response = await dataProducts(passingInfo);
		console.log(response);
	}catch(e){

	}
});
// Change the activation status of the product category also change the product status corrosponding to the product
function productCategoryActivation(req,resp){
	var category_id = req.body.category_id;
	var activateState = req.body.active_status;
	categories.findById(category_id,(err,categoryInfo)=>{
		if(!err){
				categoryInfo.active = activateState;
				categoryInfo.save();		
				let conditions = {'category': category_id};
				let updateRecord  =  {'active': activateState};
				var options = { multi: true }; 
				products.update(conditions, updateRecord, options, function(err, numAffected) {
					responseObj = {categoryData : categoryInfo,msg:'Product Category has been deleted successfully.'}
					resp.status(200).send(responseObj);																						 
				});								
		}else{
			resp.status(500).send('Unable to delete data');
		}
	});
}
// Callback function for categories with its all products
function getAllCategoriesWithItsProducts(req,resp){
	categories.aggregate([
			{ $lookup: {from: "products", localField: "_id", foreignField: "category", as: "productData"} },
			{ $match: { 'is_delete': false } },
			{ $sort : { 'created_on': -1 } }
 	],function (error, data) {
			if(!error){
				resp.status(200).send(data);
			}else{
				resp.status(500).send('Something went wrong');
			}
	});
}
// Callback function for categories of the Products
function getCategories(req,resp){
	categories.find({'active':true,'is_delete': false},function(err,data){
		if (!err){
			resp.status(200).send(data);
		}else{
			resp.status(500).send('Something went wrong');
		} 
	});
}
// End of the code related to async and await
function dataProducts(params){
	var limit = params.limit;
	var offset = params.offset;
	var category = params.category;
	products.aggregate([
		   { $lookup: {from: "rates", localField: "_id", foreignField: "product_id", as: "ratesData"} },
		   { $lookup: {from: "categories", localField: "category", foreignField: "_id", as: "categoryData"} },
		   { $lookup: {from: "users", localField: "created_by", foreignField: "_id", as: "createdBy"} },
		// { $match: { name: 'Samsung Galaxy Pro1' } }
			 { $sort : { 'created_on': -1 } }
		]);	
	return {products};
}

// Get all top rated products to be shown on the Home Page
async function highrateditems(req,resp){
	await product_ratting.find().populate({
		path:'user_kart_id',
		model:'kart_history',
		populate:[
			{
				path:'product_id',
				model:'products',
				populate:{
					path:'category',
					model:'categories'
				}			
			},{
				path:'user_id',
				model:'users'
			}			
	]
	}).exec(function(err, dataVal) {
		if(!err){
			rates.find().populate({
				path:'product_id',
				model:products
			}).exec(function(errror,rateData){
				if(errror){
					resp.status(500).send('Something went wrong');
				}else{
					finalObject = {'product_rates':rateData,'rattingInfo':dataVal}
					resp.status(200).send(finalObject);
				}
			});			
		}else{
			resp.status(500).send('Something went wrong');
		}
	});
}
// Do feedback of the Item by the user 
function feedback(req,resp){
	var product_cart_id = req.body.product_cart_id;
	var feedback_comment = req.body.feedback_comment;
	var rating_no = req.body.rating_no;
	var feedbackByUser;
	if((feedback_comment != '' && typeof feedback_comment != 'undefined') && (rating_no != '' && typeof rating_no != 'undefined')){
		feedbackByUser = {
			user_kart_id: product_cart_id,
			rating: rating_no,
			feeback_comment: feedback_comment,
			created_on: Date.now()
		}		
	}else if(feedback_comment != '' && typeof feedback_comment != 'undefined'){
		feedbackByUser = {
			user_kart_id: product_cart_id,
			rating:'',
			feeback_comment: feedback_comment,
			created_on: Date.now()
		}
	}else if(rating_no != '' && typeof rating_no != 'undefined'){
		feedbackByUser = {
			user_kart_id: product_cart_id,
			rating: rating_no,
			feeback_comment:'',
			created_on: Date.now()
		}
	}
	if(feedbackByUser !='' && typeof feedbackByUser != 'undefined'){
		var product_ratting_data = new product_ratting(feedbackByUser);
		product_ratting_data.save().then(product_ratting_response=>{
			resp.status(200).send(product_ratting_response);
		}).catch(err=> {
			resp.status(500).send('Unable to save data');
		});
	}else{
		resp.status(200).send({msg:'Rating saved successfully!'});
	}
} 

// Get all user History Products
function getProductHistory(req,resp){
  var limit = req.body.limit;
	var offset = req.body.offset;
	var userEmail = req.body.user_email;
	// Get the User Id from the token
	//if(req.decodedToken != 'undefined' && req.decodedToken !=''){
		//var userEmail = req.decodedToken.user_email;
		users.find({'user_email':userEmail},(err,userInfo)=>{
			if(err){
				resp.status(500).send('Authentication Problem');
			}else{
				var userId = userInfo[0]._id;	
				kart_history.aggregate([
					{ $lookup: {from: "products", localField: "product_id", foreignField: "_id", as: "productData"} },
					{ $unwind: {path: "$productData",preserveNullAndEmptyArrays: true } }, 
					{ $lookup: {from: "rates", localField: "productData._id", foreignField: "product_id", as: "ratesData"} },
					{ $lookup: {from: "categories", localField: "productData.category", foreignField: "_id", as: "categoryData"} },
					{ $lookup: {from: "users", localField: "user_id", foreignField: "_id", as: "createdBy"} },
					{ $match: { user_id: userId } },
					{ $sort : { 'updated_on': -1 } }
			 ],function (error, data) {
						 if(!error){
								resp.status(200).send(data);
						 }else{
							 resp.status(500).send('Something went wrong');
						 }
				 });
			}
		});
	//}
}


// Get all user Paid Products
function getUserPaidProducts(req,resp){
  var limit = req.body.limit;
	var offset = req.body.offset;
	var userEmail = req.body.user_email;
	// Get the User Id from the token
	//if(req.decodedToken != 'undefined' && req.decodedToken !=''){
		//var userEmail = req.decodedToken.user_email;
		users.find({'user_email':userEmail},(err,userInfo)=>{
			if(err){
				resp.status(500).send('Authentication Problem');
			}else{
				var userId = userInfo[0]._id;	
				kart_history.aggregate([
					{ $lookup: {from: "products", localField: "product_id", foreignField: "_id", as: "productData"} },
					{ $unwind: { path: "$productData",preserveNullAndEmptyArrays: true } }, 
					{ $lookup: {from: "rates", localField: "productData._id", foreignField: "product_id", as: "ratesData"} },
					{ $lookup: {from: "categories", localField: "productData.category", foreignField: "_id", as: "categoryData"} },
					{ $lookup: {from: "users", localField: "user_id", foreignField: "_id", as: "createdBy"} },
					{ $lookup: {from: "product_ratting", localField: "_id", foreignField: "user_kart_id", as: "rattingInfo"} },
					{ $match: { $and : [{user_id: userId },{ is_payment_done: true }]  } },
					{ $sort : { 'updated_on': -1 } }
					//{ $match: {  user_id: userId }   }
			 ],function (error, data) {
						 if(!error){
								resp.status(200).send(data);
						 }else{
							 resp.status(500).send('Something went wrong');
						 }
				 });
			}
		});
	//}
}
// Get all user cart Products
function getCartProducts(req,resp){
  var limit = req.body.limit;
	var offset = req.body.offset;
	var userEmail = req.body.user_email;
	// Get the User Id from the token
	//if(req.decodedToken != 'undefined' && req.decodedToken !=''){
		//var userEmail = req.decodedToken.user_email;
		users.find({'user_email':userEmail},(err,userInfo)=>{
			if(err){
				resp.status(500).send('Authentication Problem');
			}else{
				var userId = userInfo[0]._id;	
				kart_history.aggregate([
					{ $lookup: {from: "products", localField: "product_id", foreignField: "_id", as: "productData"} },
					{ $unwind: { path: "$productData",preserveNullAndEmptyArrays: true } }, 
					{ $lookup: {from: "rates", localField: "productData._id", foreignField: "product_id", as: "ratesData"} },
					{ $lookup: {from: "categories", localField: "productData.category", foreignField: "_id", as: "categoryData"} },
					{ $lookup: {from: "users", localField: "user_id", foreignField: "_id", as: "createdBy"} },
					{ $match: { $and : [{user_id: userId },{ is_payment_done: false }]  } },
					{ $sort : { 'updated_on': -1 } }
			 ],function (error, data) {
						 if(!error){
								resp.status(200).send(data);
						 }else{
							 resp.status(500).send('Something went wrong');
						 }
				 });
			}
		});
	//}
}
// Get all the Products
function getAllProducts(req,resp){
	var limit = req.body.limit;
	var offset = req.body.offset;
	var category = req.body.category;
	products.aggregate([
     { $lookup: {from: "rates", localField: "_id", foreignField: "product_id", as: "ratesData"} },
     { $lookup: {from: "categories", localField: "category", foreignField: "_id", as: "categoryData"} },
     { $lookup: {from: "users", localField: "created_by", foreignField: "_id", as: "createdBy"} },
	// { $match: { name: 'Samsung Galaxy Pro1' } }
		 { $sort : { 'created_on': -1 } }
	],function (error, data) {
        if(!error){
		   		resp.status(200).send(data);
				}else{
					resp.status(500).send('Something went wrong');
				}
    });
}
// To disable product by admin
function productActivation(req,resp){
   var activateState = req.body.active_status;
	 var product_id = req.body.product_id;
	 products.findById(product_id,(err,productInfo)=>{
	  if(!err){					
			categories.findById(productInfo.category,(err,categoryInfo)=>{
				if(err){
					resp.status(500).send('Unable to save data');
				}else{
					if(categoryInfo.active){
							var enabled = 'disabled';
							if(activateState == false || activateState == 'false'){
								productInfo.active = false;
							}else{
								productInfo.active = true;
								enabled = 'enabled';
							}
							productInfo.save();
							responseObj = {productData : productInfo,msg:'Product has been '+ enabled + ' successfully.'}
							resp.status(200).send(responseObj);
					}else{
						responseObj = {productData : productInfo,msg:'Product Category is disabled. To enable this product please enable the category of this product.'}
						resp.status(200).send(responseObj);
					}
				}
			});
	  }else{
			resp.status(500).send('Unable to save data');
	  }
   });
}
// Soft deletion of category and its product
function productCategoryDeletion(req,resp){
	var category_id = req.body.category_id;
	categories.findById(category_id,(err,categoryInfo)=>{
		if(!err){				
				categoryInfo.is_delete = true;
				categoryInfo.save();				
				let conditions = {'category': category_id};
				let updateRecord  =  {'is_delete': true};
				var options = { multi: true }; 
				products.update(conditions, updateRecord, options, function(err, numAffected) {
					responseObj = {categoryData : categoryInfo,msg:'Product Category has been deleted successfully.'}
					resp.status(200).send(responseObj);																						 
				});								
		}else{
			resp.status(500).send('Unable to delete data');
		}
	});
}
// Soft delete Product by the Admin
function productDeletion(req,resp){
	var product_id = req.body.product_id;
	products.findById(product_id,(err,productInfo)=>{
	 if(!err){				
		 productInfo.is_delete = true;
		 productInfo.save();
		 responseObj = {productData : productInfo,msg:'Product has been deleted successfully.'}
		 resp.status(200).send(responseObj);
	 }else{
		 resp.status(500).send('Unable to save data');
	 }
	});
}
// While doing payment successful, we are removing that product from user kart to user history
function productPayment(req,resp){
	var userProductKartId = req.body.kart_id;
	kart_history.findById(userProductKartId, (err, userKartInfo) => {
		if(!err) {
			userKartInfo.is_payment_done = 1;
			userKartInfo.save();
			resp.status(200).send(userKartInfo);
		}else{
		    resp.status(500).send('Unable to save data');
		}
	});
}

// Doing Bulk Payment
function bulkPayment(req,resp){
	var userId = req.body.user_id;
	let conditions = {'user_id': userId,'is_payment_done':false};
	let updateRecord  =  {'is_payment_done': true,'updated_on':Date.now()};
	var options = { multi: true }; 
	kart_history.update(conditions, updateRecord, options, function(err, numAffected) {
		if(err){
			resp.status(500).send('Unable to update data');
		}else{
				let responseObect = {'totalBulkPayment':numAffected.nModified,'message':'Bulk payment is done successfully'};
				resp.status(200).send(responseObect);																
		} 
	});
}

// After doing payment successful, user can provide their feedback corresponding to the product
function addProductRating(req,resp){
	var product_ratting_data = new product_ratting(req.body);
	product_ratting_data.save().then(product_ratting_data=>{
		resp.send(product_ratting_data);
	}).catch(err=> {
		resp.status(500).send('Unable to save data');
	});
}
// User can add the product into its kart
function addProductToHistory(req,resp){
	var kartdata = new kart_history(req.body);
	kartdata.save().then(kartdata=>{
		resp.send(kartdata);
	}).catch(err=> {
		resp.status(500).send('Unable to save data');
	});
}
// Show all enabled products list to the end-user
function getAllEnabledProducts(){
	  Product.find(function (err, products) {
    if (!err){
	  	res.send(products)  
		} 
  });
}
// Add Category Callback function
function addcategory(req,resp){
	var categorydata = new categories(req.body);
	categorydata.save().then(category=>{
		resp.send(category);
	}).catch(err=> {
		resp.status(500).send('Unable to save data');
	});
}
// User Login callback function
function login(req,resp){
	var user_email = req.body.user_email;
	var user_password = req.body.user_password;
	var user_role = req.body.user_role;	
	users.find({'user_email':user_email,'user_password':user_password,'user_role':user_role},(err,userInfo)=>{
		if(err){
			resp.status(500).send('Authentication Problem');
		}else{
			if(userInfo.length > 0){
				var jwttoken = jsonWebToken.sign(
					{
						user_fname : userInfo[0].user_fname,
						user_lname : userInfo[0].user_lname,
						user_email : userInfo[0].user_email
					},
					privateShoppingKartSecretKey
				);

				var cartHistory;	
				kart_history.find({'user_id':userInfo[0]._id,'is_payment_done': false},(err,userCartInfo)=>{
					if(err){
						console.log('error');
					}else{
						cartHistory = userCartInfo;
					}
					var response = {
						message : 'User logged in successfully',
						id : userInfo[0]._id,
						jwttoken : jwttoken,
						user_fname : userInfo[0].user_fname,
						user_lname : userInfo[0].user_lname,
						user_email : userInfo[0].user_email,
						user_phone : userInfo[0].user_phone,
						user_role: userInfo[0].user_role,
						cart_history:cartHistory
					}
					resp.status(200).send(response);
				});				
			}else{
				resp.status(500).send('Authentication Problem');
			}
		}
	});
}
// Registration Callback function
function signup(req,resp){
	var signupdata = new users(req.body);
	signupdata.save().then(user=>{
		resp.send(user);
	}).catch(err=> {
		resp.status(500).send('Unable to save data');
	});
}
// JWT token validating
function jsontokenvalidator(req,resp,next){
	var checkofnofound = true;
	if(typeof req.headers.authorization != 'undefined'){
		var bareerToken = req.headers.authorization;
		var splitedData = bareerToken.split(' ');
		if(splitedData.length > 0){
			var vart_token = splitedData[1];
			jsonWebToken.verify(vart_token,privateShoppingKartSecretKey,function(err,data){
				if(!err){
					checkofnofound = false;
					// Binding the decoded token in each requests.
					req.decodedToken = data;
					next();
				}
			});		
		}		
	}
	if(checkofnofound){
		resp.status(402).send({
			message:'Invalid request'
		});
	}	
}