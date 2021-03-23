module.exports =function (app) {
	
	const dataStore = require("nedb");
	const path = require("path");
	
	const BASE_API_URL = "/api/v1";
	const dbFileName = path.join(__dirname,"alumnos.db");


	const db = new dataStore({
		filename: dbFileName,
		autoload: true
	});
	

	//----- API ALUMNOS --------//
	
	var alumnos = [] ;

	var initialalumnos = [
		{ 
			nombre: "france",
			year: 2015,
			trim1: 7668,
			trim2: 1554,
			trim3: 879,
		},
		{ 
			nombre: "italy",
			year: 2016,
			trim1: 7463,
			trim2: 1347,
			trim3: 663,
		},
		{ 
			nombre: "portugal",
			year: 2017,
			trim1: 6632,
			trim2: 1340,
			trim3: 595,
		},
		{ 
			nombre: "uk",
			year: 2016,
			trim1: 7948,
			trim2: 1888,
			trim3: 771,
		},
		{ 
			nombre: "mexico",
			year: 2015,
			trim1: 5217,
			trim2: 1086,
			trim3: 300,
		}
	];
	
	//LOAD INITIAL DATA de GET /alumnos

	app.get(BASE_API_URL+"/alumnos/loadInitialData", (req,res) =>{
		db.remove({}, { multi: true }, function (err, deletealumnos) {});
		db.insert(initialalumnos);
		res.sendStatus(200);
		console.log("Initial loaded:"+JSON.stringify(initialalumnos,null,2));
	});

	// GET ALUMNOS

		app.get(BASE_API_URL+"/alumnos", (req,res) =>{
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        var nombre = req.query.nombre;
        var year = parseInt(req.query.year);
        var trim1 = parseFloat(req.query.trim1);
        var trim2 = parseFloat(req.query.trim2);
        var trim3 = parseFloat(req.query.trim3);
        
    
        if(from && to) {
            db.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, alumnos)=>{
                if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	}    
			});
			
        } else if(nombre || year || trim1 || trim2 || trim3) {
              if(!year && !trim1 && !trim2 && !trim3 ) {
                   db.find({"nombre":nombre}).skip(offset).limit(limit).exec((err, alumnos)=>{
                    if(alumnos.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
                	} else { 
                   		alumnos.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(alumnos,null,2));
                		}  
                	});
                  
              }  else if(!nombre && !trim1 && !trim2 && !trim3 ) {
				  db.find({"year":year}).skip(offset).limit(limit).exec((err, alumnos)=>{
					   if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                });
				  
        } else if(!nombre && !year && !trim2 && !trim3) {
                   db.find({"trim1":trim1}).skip(offset).limit(limit).exec((err, alumnos)=>{
                    if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                	}); 
			
        }  else if(!nombre && !year && !trim1 && !trim3 ) {
                   db.find({"trim2":trim2}).skip(offset).limit(limit).exec((err, alumnos)=>{
                    if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                });
			
        } else if(!nombre && !year && !trim1 && !trim2 ) {
                   db.find({"trim3":trim3}).skip(offset).limit(limit).exec((err, alumnos)=>{   
				if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                });
        }  else if(!trim1 && !trim2 && !trim3 ) {
            db.find({"nombre":nombre, "year": year}).skip(offset).limit(limit).exec((err, alumnos)=>{
                        if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                });
        }	else {
            db.find({"nombre":nombre, "year": year, "trim1":trim1, "trim2":trim2}).skip(offset).limit(limit).exec((err, alumnos)=>{
                        if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                });
        }	
			
        } else {
			
            db.find({}).skip(offset).limit(limit).exec((err, alumnos)=>{
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
				});      
            };
    
	});



		// POST ALUMNOS

		app.post(BASE_API_URL+"/alumnos",(req,res) =>{

			var newalumnos = req.body;

			db.find({nombre : newalumnos.nombre, year : newalumnos.year},function (err,alumnos){
			if (alumnos.length > 0){
				res.sendStatus(409,"CONFLITCT");
			}else if((newalumnos == "") || (newalumnos.nombre == null) || (newalumnos.nombre == "") || (newalumnos.year == null) || (newalumnos.year == null) ||
					(newalumnos.trim1 == "") || (newalumnos.trim1 == null) ||
					(newalumnos.trim2 == "") || (newalumnos.trim2 == null) ||
					(newalumnos.trim3 == "") || (newalumnos.trim3 == null)){
	
				res.sendStatus(400,"BAD REQUEST");
			} else {
				db.insert(newalumnos); 	
				res.sendStatus(201,"CREATED");
			}
		});
	});
		app.post(BASE_API_URL+"/alumnos/:nombre/:year",(req,res) =>{
			 res.sendStatus(405);
			});
	
	// DELETE ALUMNOS

		app.delete(BASE_API_URL+"/alumnos/", (req,res)=>{
		db.remove({}, { multi: true }, function (err, deletealumnos) {});
		res.sendStatus(200);
		});


		// GET ALUMNOS/XXX

		app.get(BASE_API_URL+"/alumnos/:nombre/:year", (req,res)=>{

		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		db.find({"nombre" : nombre, "year" : year},function (err,filteredalumnos){
			if(filteredalumnos.length >= 1){
				res.send(filteredalumnos.map((c)=>{
						delete c._id;
						return c;
					})[0]);
			}else{
				res.sendStatus(404,"ALUMNOS NOT FOUND");
			}
		})
	});
	
	
	// PUT ALUMNOS/XXX

	app.put( BASE_API_URL+"/alumnos/:nombre/:year", (req, res) => {
		var updatedalumnos = req.body;
		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		if((updatedalumnos.nombre=="") ||(updatedalumnos.nombre!=nombre) || (updatedalumnos.year=="")  ||(updatedalumnos.year!=year)|| (updatedalumnos.trim1=="") || (updatedalumnos.trim2=="")  ||(updatedalumnos.trim3=="")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({"nombre": nombre, "year": year}, updatedalumnos);
			res.sendStatus(200,"OK");
		}
	});


	app.put(BASE_API_URL+"/alumnos/", (req,res)=>{
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});

		
		// DELETE ALUMNOS/XXX

		app.delete(BASE_API_URL+"/alumnos/:nombre/:year", (req,res)=>{

		var nombre = req.params.nombre;
		var year =  parseInt(req.params.year);

		db.remove({"nombre" : nombre, "year" : year},  {}, function(err, filteredalumnos){	
			if(filteredalumnos == 1) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404,"ALUMNOS NOT FOUND");
				}
		});
	});
	
}
