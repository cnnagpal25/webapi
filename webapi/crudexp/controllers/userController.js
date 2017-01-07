(function(){
	'use strict';
	var user=require('../modal/User');
	var men=require('../modal/Men');
	exports.me = function (req, res) {
		    console.log("inside controller me");
		    res.send("page render finished from controller");
		};
		exports.you=function (req,res){
			console.log("inside controller you");
		    res.send("page render finished from you controller");
		};
		exports.login=function(req,res){
			console.log("req"+JSON.stringify(req.body));
			var email=req.body.email;
			var pass=req.body.password;
			console.log("email is"+email);
			//res.send("write code for login post");
			user.login(req,email,pass,function(err, status){
				if(status==true){
					req.mySession.email=email;
					res.redirect('/customer-orders');
				}
				else{
					res.render('../views/login.ejs');
				}

			});
		}
		exports.logout=function(req,res){
			req.mySession.email="";
			res.redirect('/');
		}
		exports.list=function(req,res){
			console.log("inside list"+req.param('pagelimit'));
			console.log("inside list"+req.headers['api-key']);
		}
		exports.plist=function(req,res){
			console.log("inside plist");
		}
		exports.items=function(req,res){
			var params={"productName":req.body['productName'],"category":req.body['category'],"description1":req.body['description'],"merchantsku":req.body['merchantsku'],"itemprice":req.body['itemprice'],"itemdiscount":req.body['itemdiscount'],"user_db":req.body['user_db']}
				men.putMenDetail(params,function(err,data){
					console.log("data is"+JSON.stringify(data));
					if(err){
						res.send({"err":err});
					}
					else{
						res.send({"data":data});
					}
				});
			

		}
			
		exports.getItems=function(req,res){
			var params={"user_db":req.body['user_db']};
			men.getAllItems(params,function(err,data){
				data.toArray(function(err, itemData){
					console.log("getItems"+JSON.stringify(itemData));
					if(err){
						res.send({"err":err});
					}
					else{
						res.send({"data":itemData});
					}
				})

			})

		}
		exports.customerOrders=function(req,res){
			res.render('../views/customer-orders.ejs',{mySession:req.mySession});
		}
}())