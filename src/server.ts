import express, {Request, Response} from 'express';
import fs from 'fs';

const port = process.env.PORT || "3000";
const app = express();

app.use('/js',express.static(__dirname + '/../static/js'));
app.use('/css',express.static(__dirname + '/../static/css'));

const index = fs.readFileSync(`${__dirname}/../static/index.html`);

app.get('/',function(req: Request,res: Response){
  res.writeHead(200, {'Content-Type': 'text/html','Access-Control-Allow-Origin': '*'});
  res.write(index);
  res.end();
});

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});