const express = require('express');
const xml2js = require('xml2js');
const app = express();

app.use('/frete/:cep', calculaFrete);
app.get('/frete/:cep', function(req,res,){ return res.json(req.data)});
app.use('/endereco/:cep', buscaEndereco);
app.get('/endereco/:cep', function(req,res){ return res.json(req.data)});

function buscaEndereco(req,res,next){
  let regex = new RegExp('^[0-9]{8}$');
  if(regex.test(req.params['cep'])){

    const apiViaCEP = 'https://viacep.com.br/ws/'+req.params['cep']+'/json/';
    
    fetch(apiViaCEP).then(function(response) {
      if (response.status !== 200) {
        console.log('Ocorreu um problema. Codigo: ' +response.status); 
        return;
      }
      response.json().then(function(data) {
        if(data.erro == "true"){
          return res.json("cep invalido");
        } 
        req.data = data;
        next();
      });    
    }).catch(function(err) {console.log('Fetch Error :-S', err);});
  }
  else{
    return res.json("cep invalido");
  }
    
}
function calculaFrete(req,res,next){
  let regex = new RegExp('^[0-9]{8}$');
  if(regex.test(req.params['cep'])){
    const apiCorreios = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=41106&sCepOrigem=26087150&sCepDestino="+req.params['cep'] +"&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&nVlValorDeclarado=0&StrRetorno=xml&nIndicaCalculo=3 ";
    fetch(apiCorreios).then(function(response){
      if(response.status !== 200){
        console.log('Ocorreu um problema. Codigo: ' + response.status);
        return;
      }
      response.text().then(function(data){
        const parser = new xml2js.Parser();
        parser.parseString(data,(err,resultado) => {
          req.data = resultado;
        });
        next();
      });
    })
  }
  else{
    return res.json("cep invalido");
  }
}

app.listen(process.env.PORT || 8000);

console.log('Servidor rodando em http://localhost:8000/');
