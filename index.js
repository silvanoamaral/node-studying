var app = require('./config/custom-express')();

//listen define que esta ouvindo uma determinada porta
app.listen(5000, function() {
    console.log('Servidor rodando na porta 5000');
});

