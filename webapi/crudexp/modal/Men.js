
	var dbFile=require('../config/db');
	exports.putMenDetail=function(params,putMenDetailsCallback){
		console.log("inside Men modal");
		dbFile.connectDb(params.user_db,function(err,data){
			console.log("err"+JSON.stringify(err));
			if(!err){
				data.collection('men').insert({"productName":params.productName,"productCategory":params.category,"description":params.description1,"merchantSku":params.merchantsku,"itemPrice":params.itemprice,"itemDiscount":params.itemdiscount},function(err,data1){
					if(err){
						putMenDetailsCallback(err,"we have error");
					} else{
						putMenDetailsCallback("","inserted sucessfully");
					}

				})
			} else{
				putMenDetailsCallback(err,"we have error");
			}
		});
		
	}
	exports.getAllItems=function(params,cb){
		console.log("inside getAllItems" );
		dbFile.connectDb(params.user_db,function(err,data){
			if(!err){
				data.collection('men').find({},function(err,curser){
					if(err){
						cb(err,"error in find query");
					} else{
						cb("",curser);
					}
				})

			} else{
				cb(err,"unable to make connection");
			}
		});
	}
	exports.getOneRecord=function(params,cb){
		console.log("inside getOneRecord"+JSON.stringify(params));
		dbFile.connectDb(params.user_db,function(err,data){
			if(!err){
				data.collection('men').findOne({"merchantSku":params.merchantSku},function(err,curser){
					if(err){
						cb(err,"error in find query");
					} else{
						console.log("curser"+JSON.stringify(curser));
						cb("",curser);
					}
				})

			} else{
				cb(err,"unable to make connection");
			}

		});
	}


