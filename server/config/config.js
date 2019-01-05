/*===========================================================
                         PUERTO                                  
=============================================================*/
process.env.PORT = process.env.PORT || 3000

/*=============================================
				ENTORNO
=============================================*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


/*=============================================
				JWT VENCIMIENTO
=============================================*/
process.env.CADUCIDAD_TOKEN = "30 days"

/*=============================================
				SEED DE AUTENTIFICACION
=============================================*/

process.env.SEED = 'seed-de-desarrollo'

/*=============================================
				BASES DE DATOS
=============================================*/

let urlDB
if (process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/animelist'
}else{
	/* urlDB = 'mongodb://cafe-user:102455aj@ds115283.mlab.com:15283/cafe' */
	urlDB = 'mongodb://animelist-user:123456aj@ds155091.mlab.com:55091/animelist'
}

process.env.URLDB = urlDB