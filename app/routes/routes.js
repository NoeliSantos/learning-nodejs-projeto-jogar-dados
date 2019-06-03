module.exports = function(application){

	application.get('/', function(req,res){
		res.render('home');
	});

	application.get ('/iniciar', function(req,res){
		console.log('routes: /iniciar');
        application.app.controllers.jogo.iniciar(application, req, res);
	});

	application.get('/lancarDados', function(req,res){
    	console.log('routes: /lancarDados');
    	res.send('Esta funcionalidade não foi implementada ainda.'); 
    });

    application.get('/reiniciar', function(req,res){
    	console.log('routes: /reiniciar');    	        
    	res.send('Esta funcionalidade não foi implementada ainda.');
    });
    
    application.get('/encerrar', function(req,res){
    	console.log('routes: /encerrar');        
    	res.send('Esta funcionalidade não foi implementada ainda.');
    });

}