module.exports =function (app) {
	
	const dataStore = require("nedb");
	const path = require("path");
	
	const BASE_API_URL = "/api/v1";
	const dbFileName = path.join(__dirname,"profesores.db");
	

	const db = new dataStore({
		filename: dbFileName,
		autoload: true
		});


	//----------API PROFESORES-------//

	
	var profesores = [] ;
	

	var Initialprofesores = [
		{ 
			nombre: "france",
			year: 2015,
			trim_1: 151040,
			trim_2: 58660,
			trim_3:92380
		},
		{ 
			nombre: "italy",
			year: 2016,
			trim_1: 29329,
			trim_2: 26000,
			trim_3:3329
		},
		{ 
			nombre: "portugal",
			year: 2017,
			trim_1: 46477,
			trim_2: 19952,
			trim_3:26254
		},
		{ 
			nombre: "uk",
			year: 2016,
			trim_1: 57298,
			trim_2: 21017,
			trim_3:36280
		},
		{ 
			nombre: "mexico",
			year: 2015,
			trim_1: 61382,
			trim_2: 59956,
			trim_3:1427
		}
	];


	//LOAD INITIAL DATA de GET /profesores
	app.get(BASE_API_URL+"/profesores/loadInitialData", (req,res) =>{
		db.remove({}, { multi: true }, function (err, deleteprofesores) {});
		db.insert(Initialprofesores);
		res.sendStatus(200);
		console.log("Initial loaded:"+JSON.stringify(Initialprofesores,null,2));
	});

	// GET PROFESORES

	app.get(BASE_API_URL+"/profesores", (req,res) =>{
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        var nombre = req.query.nombre;
        var year = parseInt(req.query.year);
        var trim_1 = parseFloat(req.query.trim_1);
        var trim_2 = parseFloat(req.query.trim_2);
        var trim_3 = parseFloat(req.query.trim_3);
        
    
        if(from && to) {
            db.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, profesores)=>{
                if(profesores.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
                	}    
			});
			
        } else if(nombre || year || trim_1 || trim_2 || trim_3) {
              if(!year && !trim_1 && !trim_2 && !trim_3 ) {
                   db.find({"nombre":nombre}).skip(offset).limit(limit).exec((err, profesores)=>{
                    if(profesores.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
                	} else { 
                   		profesores.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(profesores,null,2));
                		}  
                	});
                  
              }  else if(!nombre && !trim_1 && !trim_2 && !trim_3 ) {
				  db.find({"year":year}).skip(offset).limit(limit).exec((err, profesores)=>{
					   if(profesores.length == 0) {
						res.sendStatus(404,"NOT FOUND");
                	} else { 
                    	profesores.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(profesores,null,2));
                	} 
                });
				  
        } else if(!nombre && !year && !trim_2 && !trim_3) {
                   db.find({"trim_1":trim_1}).skip(offset).limit(limit).exec((err, profesores)=>{
                    if(profesores.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
               	 	} else { 
                   		profesores.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(profesores,null,2));
                		} 
                	}); 
			
        }  else if(!nombre && !year && !trim_1 && !trim_3 ) {
                   db.find({"trim_2":trim_2}).skip(offset).limit(limit).exec((err, profesores)=>{
                    if(profesores.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
                	} 
                });
			
        } else if(!nombre && !year && !trim_2 && !trim_1 ) {
                   db.find({"trim_3":trim_3}).skip(offset).limit(limit).exec((err, profesores)=>{   
				if(profesores.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
                	} 
                });
        }  else if(!trim_1 && !trim_2 && !trim_3 ) {
            db.find({"nombre":nombre, "year": year}).skip(offset).limit(limit).exec((err, profesores)=>{
                        if(profesores.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
                	} 
                });
        }	else  {
            db.find({"nombre":nombre, "year": year, "trim_2":trim_2, "trim_3":trim_3}).skip(offset).limit(limit).exec((err, profesores)=>{
                        if(profesores.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
                	} 
                });
        }
        } else {
			
            db.find({}).skip(offset).limit(limit).exec((err, profesores)=>{
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
				});      
            };
    
	});


	// POST PROFESORES

	app.post(BASE_API_URL+"/profesores",(req,res) =>{

		var newprofesores = req.body;

		db.find({nombre : newprofesores.nombre, year : newprofesores.year},function (err,profesores){
			if (profesores.length > 0){
				res.sendStatus(409,"CONFLITCT");
			}else if((newprofesores == "") || (newprofesores.nombre == null) || (newprofesores.nombre == "") || (newprofesores.year == null) || (newprofesores.year == "")|| (newprofesores.trim_1 == null) || (newprofesores.trim_1 == "")|| (newprofesores.trim_2 == null) || (newprofesores.trim_2 == "")|| (newprofesores.trim_3 == null) || (newprofesores.trim_3 == "")){
				res.sendStatus(400,"BAD REQUEST");
			} else {
				db.insert(newprofesores); 	
				res.sendStatus(201,"CREATED");
			}
		});
	});
	app.post(BASE_API_URL+"/profesores/:nombre/:year",(req,res) =>{
		res.sendStatus(405);
	});


	// DELETE PROFESORES

	app.delete(BASE_API_URL+"/profesores/", (req,res)=>{
		db.remove({}, { multi: true }, function (err, deleteprofesores) {});
		res.sendStatus(200);
	});


	// GET PROFESORES/XXX

	app.get(BASE_API_URL+"/profesores/:nombre/:year", (req,res)=>{

		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		db.find({"nombre" : nombre, "year" : year},function (err,filteredprofesores){
			if(filteredprofesores.length >= 1){
				res.send(filteredprofesores.map((c)=>{
						delete c._id;
						return c;
					})[0]);
			}else{
				res.sendStatus(404,"PROFESORES NOT FOUND");
			}
		})
	});

	// PUT PROFESORES/XXX
	
	app.put( BASE_API_URL+"/profesores/:nombre/:year", (req, res) => {
		var Updatedprofesores = req.body;
		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		if((Updatedprofesores.nombre=="") ||(Updatedprofesores.nombre!=nombre) || (Updatedprofesores.year=="")  ||(Updatedprofesores.year!=year)|| (Updatedprofesores.trim_1=="") || (Updatedprofesores.trim_2=="")  ||(Updatedprofesores.trim_3=="")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({"nombre": nombre, "year": year}, Updatedprofesores);
			res.sendStatus(200,"OK");
		}
	});


	app.put(BASE_API_URL+"/profesores/", (req,res)=>{
		res.sendStatus(405);
	});


	// DELETE PROFESORES/XXX

	app.delete(BASE_API_URL+"/profesores/:nombre/:year", (req,res)=>{

		var nombre = req.params.nombre;
		var year =  parseInt(req.params.year);

		db.remove({"nombre" : nombre, "year" : year},  {}, function(err, filteredprofesores){	
			if(filteredprofesores == 1) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404,"PROFESORES NOT FOUND");
				}
		});
	});

}
