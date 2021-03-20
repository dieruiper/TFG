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

	var initialAlumnos = [
		{ 
			nombre: "diego",
			year: 2015,
			trim_1: 151,
			trim_2: 1554,
			trim_3: 879,
		},
		{ 
			nombre: "victoria",
			year: 2016,
			trim_1: 7463,
			trim_2: 1347,
			trim_3: 663,
		},
		{ 
			nombre: "paqui",
			year: 2017,
			trim_1: 6632,
			trim_2: 1340,
			trim_3: 595,
		},
		{ 
			nombre: "kiko",
			year: 2016,
			trim_1: 7948,
			trim_2: 1888,
			trim_3: 771,
		},
		{ 
			nombre: "carmen",
			year: 2015,
			trim_1: 5217,
			trim_2: 1086,
			trim_3: 300,
		}
	];

	//LOAD INITIAL DATA de GET /alumnos

	app.get(BASE_API_URL+"/alumnos/loadInitialData", (req,res) =>{
		db.remove({}, { multi: true }, function (err, deleteAlumnos) {});
		db.insert(initialAlumnos);
		res.sendStatus(200);
		console.log("Initial loaded:"+JSON.stringify(initialAlumnos,null,2));
	});

	// GET ALUMNOS

		app.get(BASE_API_URL+"/alumnos", (req,res) =>{
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

        } else if(nombre || year || trim_1 || trim_2 || trim_3) {
              if(!year && !trim_1 && !trim_2 && !trim_3 ) {
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

              }  else if(!nombre && !trim_1 && !trim_2 && !trim_3 ) {
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

        } else if(!nombre && !year && !trim_2 && !trim_3) {
                   db.find({"trim_1":trim_1}).skip(offset).limit(limit).exec((err, alumnos)=>{
                    if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                	}); 

        }  else if(!nombre && !year && !trim_1 && !trim_3 ) {
                   db.find({"trim_2":trim_2}).skip(offset).limit(limit).exec((err, alumnos)=>{
                    if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                });

        } else if(!nombre && !year && !trim_1 && !trim_2 ) {
                   db.find({"trim_3":trim_3}).skip(offset).limit(limit).exec((err, alumnos)=>{   
				if(alumnos.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    alumnos.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(alumnos,null,2));
                	} 
                });
        }  else if(!trim_1 && !trim_2 && !trim_3 ) {
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
            db.find({"nombre":nombre, "year": year, "trim_1":trim_1, "trim_2":trim_2}).skip(offset).limit(limit).exec((err, alumnos)=>{
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

			var newAlumnos = req.body;

			db.find({nombre : newAlumnos.nombre, year : newAlumnos.year},function (err,alumnos){
			if (alumnos.length > 0){
				res.sendStatus(409,"CONFLITCT");
			}else if((newAlumnos == "") || (newAlumnos.nombre == null) || (newAlumnos.nombre == "") || (newAlumnos.year == null) || (newAlumnos.year == null) ||
					(newAlumnos.trim_1 == "") || (newAlumnos.trim_1 == null) ||
					(newAlumnos.trim_2 == "") || (newAlumnos.trim_2 == null) ||
					(newAlumnos.trim_3 == "") || (newAlumnos.trim_3 == null)){

				res.sendStatus(400,"BAD REQUEST");
			} else {
				db.insert(newAlumnos); 	
				res.sendStatus(201,"CREATED");
			}
		});
	});
		app.post(BASE_API_URL+"/alumnos/:nombre/:year",(req,res) =>{
			 res.sendStatus(405);
			});

	// DELETE ALUMNOS

		app.delete(BASE_API_URL+"/alumnos/", (req,res)=>{
		db.remove({}, { multi: true }, function (err, deleteAlumnos) {});
		res.sendStatus(200);
		});


		// GET ALUMNOS/XXX

		app.get(BASE_API_URL+"/alumnos/:nombre/:year", (req,res)=>{

		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		db.find({"nombre" : nombre, "year" : year},function (err,filteredAlumnos){
			if(filteredAlumnos.length >= 1){
				res.send(filteredAlumnos.map((c)=>{
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
		var updatedAlumnos = req.body;
		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		if((updatedAlumnos.nombre=="") ||(updatedAlumnos.nombre!=nombre) || (updatedAlumnos.year=="")  ||(updatedAlumnos.year!=year)|| (updatedAlumnos.trim_1=="") || (updatedAlumnos.trim_2=="")  ||(updatedAlumnos.trim_3=="")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({"nombre": nombre, "year": year}, updatedAlumnos);
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

		db.remove({"nombre" : nombre, "year" : year},  {}, function(err, filteredAlumnos){	
			if(filteredAlumnos == 1) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404,"ALUMNOS NOT FOUND");
				}
		});
	});

}