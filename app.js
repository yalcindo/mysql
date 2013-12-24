
/**
 * Module dependencies.
 */
var request=require("request");
var cheerio=require("cheerio");
var mysql= require("mysql");
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// var apple="category_name = Field()
// product_name= Field()
// product_description = Field()
// product_model == Field()
// product_manufacturer= Field()
// product_image= Field()
// product_price= Field()
// product_stock_status= Field()
// product_attribute_group= Field()
// product_attribute= Field()
// product_attribute_description= Field()
// product_option= Field()
// product_option_value= Field()
// image_urls = Field()
// images = Field()";

app.get('/', routes.index);
app.get('/users', user.list);
// mysql Connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'test'
});
// connection.query('CREATE TABLE quotes.quotes (' +
//          'id INT NOT NULL AUTO_INCREMENT,' +
//          'author VARCHAR( 128 ) NOT NULL,' +
//          'quote TEXT NOT NULL, PRIMARY KEY (  id )' +
//          ')');

connection.query('INSERT INTO  quotes.quotes (' +
          'author, quote) ' +
          'VALUES ("yalcin Dogan.", "hey you");');
connection.query("SELECT*FROM quotes.quotes",function(err,result){
 console.log(result);
});
connection.end();






  
   
// var url= " http://www.you.gr/proionta/laptop,tablet/foritoi-ypologistes/laptop/mbp-13-2-4ghz-4gb-128gb-%28me864gr-a%29";

// request(url,function(err,response,body)
// {
// 	if (!err && response.statusCode == 200){
// 		$ =cheerio.load(body);
// 		var category_name=$(".categoryHeading").text();
// 		var product_name=$(".productDescription h2").text();
// 		//check product model greek?
// 		var product_model=$(".znotbk2_series8").text();
// 		console.log(product_model);
// 		var product_manufacturer=$(".znotbk_manufactur1").text();
// 		console.log(product_manufacturer)
// 		// it is a link
// 		var product_image=$(".productPhoto a").attr("href");
// 		var product_price=$(".productPrice").text();
// 		// it needs some logic to convert this Buy it button
// 		var product_stock_status=$(".add-to-cart").text();
// 		var image_urls=$();
// 		console.log(product_stock_status);

// 	}

// });


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
