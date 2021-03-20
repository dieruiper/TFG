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
			nombre: "diego",
			year: 2015,
			trimestre_1: 151,
			trimestre_2: 1554,
			trimestre_3: 879,
		},
		{ 
			nombre: "victoria",
			year: 2016,
			trimestre_1: 7463,
			trimestre_2: 1347,
			trimestre_3: 663,
		},
		{ 
			nombre: "paqui",
			year: 2017,
			trimestre_1: 6632,
			trimestre_2: 1340,
			trimestre_3: 595,
		},
		{ 
			nombre: "kiko",
			year: 2016,
			trimestre_1: 7948,
			trimestre_2: 1888,
			trimestre_3: 771,
		},
		{ 
			nombre: "carmen",
			year: 2015,
			trimestre_1: 5217,
			trimestre_2: 1086,
			trimestre_3: 300,
		}
	];


	//LOAD INITIAL DATA de GET /profesores
	app.get(BASE_API_URL+"/profesores/loadInitialData", (req,res) =>{
		db.remove({}, { multi: true }, function (err, deleteProfesores) {});
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
        var trimestre_1 = parseFloat(req.query.trimestre_1);
        var trimestre_2 = parseFloat(req.query.trimestre_2);
        var trimestre_3 = parseFloat(req.query.trimestre_3);


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

        } else if(nombre || year || trimestre_1 || trimestre_2 || trimestre_3) {
              if(!year && !trimestre_1 && !trimestre_2 && !trimestre_3 ) {
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

              }  else if(!nombre && !trimestre_1 && !trimestre_2 && !trimestre_3 ) {
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

        } else if(!nombre && !year && !trimestre_2 && !trimestre_3) {
                   db.find({"trimestre_1":trimestre_1}).skip(offset).limit(limit).exec((err, profesores)=>{
                    if(profesores.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
               	 	} else { 
                   		profesores.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(profesores,null,2));
                		} 
                	}); 

        }  else if(!nombre && !year && !trimestre_1 && !trimestre_3 ) {
                   db.find({"trimestre_2":trimestre_2}).skip(offset).limit(limit).exec((err, profesores)=>{
                    if(profesores.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
                	} 
                });

        } else if(!nombre && !year && !trimestre_2 && !trimestre_1 ) {
                   db.find({"trimestre_3":trimestre_3}).skip(offset).limit(limit).exec((err, profesores)=>{   
				if(profesores.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    profesores.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(profesores,null,2));
                	} 
                });
        }  else if(!trimestre_1 && !trimestre_2 && !trimestre_3 ) {
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
            db.find({"nombre":nombre, "year": year, "trimestre_2":trimestre_2, "trimestre_3":trimestre_3}).skip(offset).limit(limit).exec((err, profesores)=>{
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

		var newProfesores = req.body;

		db.find({nombre : newProfesores.nombre, year : newProfesores.year},function (err,profesores){
			if (profesores.length > 0){
				res.sendStatus(409,"CONFLITCT");
			}else if((newProfesores == "") || (newProfesores.nombre == null) || (newProfesores.nombre == "") || (newProfesores.year == null) || (newProfesores.year == "")|| (newProfesores.trimestre_1 == null) || (newProfesores.trimestre_1 == "")|| (newProfesores.trimestre_2 == null) || (newProfesores.trimestre_2 == "")|| (newProfesores.trimestre_3 == null) || (newProfesores.trimestre_3 == "")){
				res.sendStatus(400,"BAD REQUEST");
			} else {
				db.insert(newProfesores); 	
				res.sendStatus(201,"CREATED");
			}
		});
	});
	app.post(BASE_API_URL+"/profesores/:nombre/:year",(req,res) =>{
		res.sendStatus(405);
	});


	// DELETE PROFESORES

	app.delete(BASE_API_URL+"/profesores/", (req,res)=>{
		db.remove({}, { multi: true }, function (err, deleteProfesores) {});
		res.sendStatus(200);
	});


	// GET PROFESORES/XXX

	app.get(BASE_API_URL+"/profesores/:nombre/:year", (req,res)=>{

		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		db.find({"nombre" : nombre, "year" : year},function (err,filteredProfesores){
			if(filteredProfesores.length >= 1){
				res.send(filteredProfesores.map((c)=>{
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
		var UpdatedProfesores = req.body;
		var nombre = req.params.nombre;
		var year = parseInt(req.params.year);

		if((UpdatedProfesores.nombre=="") ||(UpdatedProfesores.nombre!=nombre) || (UpdatedProfesores.year=="")  ||(UpdatedProfesores.year!=year)|| (UpdatedProfesores.trimestre_1=="") || (UpdatedProfesores.trimestre_2=="")  ||(UpdatedProfesores.trimestre_3=="")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({"nombre": nombre, "year": year}, UpdatedProfesores);
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

		db.remove({"nombre" : nombre, "year" : year},  {}, function(err, filteredProfesores){	
			if(filteredProfesores == 1) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404,"PROFESORES NOT FOUND");
				}
		});
	});

}