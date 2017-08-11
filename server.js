var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:	'variganjisuresh', 
    database:	'variganjisuresh',
    host: 'db.imad.hasura-app.io',
    port: '5432' ,
    password: 'db-variganjisuresh-31838'
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
            title :'article-one | Suresh Variganji',
            header : 'Article One',
            content:`<p>
                        This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.
                    </p>
                     <p>
                        This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.
                    </p>
                     <p>
                        This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.This is my first page content.
                    </p>`
            
        },
        
        'article-two' : {
            title :'article-two | Suresh Variganji',
            header : 'Article Two',
            content:`<p>
                        This is my Second page content.This is my first page content.This is my second page content.This is my first page content.This is my second page content.This is my second page content.
                    </p>
                     <p>
                        This is my second page content.This is my second page content.This is my first page content.This is my second page content.This is my first page content.This is my second page content.
                    </p>`
            
        },
        
        'article-three' : {
            title :'article-three | Suresh Variganji',
            header : 'Article Three',
            content:`<p>
                        This is my third page content.This is my third page content.
                     </p>`
            
        }
};

function templateContent(data)
{
    var title = data.title;
    var header = data.header;
    var content = data.content;
    
    var htmlData = 
    `<html>
<head>
    <title> ${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="ui/style.css" rel="stylesheet" />
</head>
<body>
    <div class=container>
        <div>
              <a href='/' >Home</a>
        </div>
        <hr/>
      
        <div>
            <h1>${header}</h1>
        </div>
        <div>
            ${content}
        </div>
    </div>
</body>
</html>`;

return htmlData;
    
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    // make a select request
    // return a response with the results
  pool.query('SELECT * FROM articles',function(err,result) {
      if(err)
      {
        res.status(500).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result.rows));
      }
  });
  //res.send('got test-db request and serving response here..');
});

app.get('articles/:articleName', function (req, res) {
    // articleName - name of article one
    // articles[articleName] - content of the article one
    var articleName=req.params.articleName;
    res.send(templateContent(articles[articleName]));
});

app.get('/template-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
