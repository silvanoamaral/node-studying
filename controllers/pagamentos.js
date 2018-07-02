module.exports = function( app ) {
    app.get('/pagamentos', function(req, res) {
        console.log('Recebida requisição de teste na porta 5000.')
        res.send('Ok');
    });

    app.put('/pagamentos/pagamento:id', function(req, res) {
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamento.id = id;
        pagamento.status = 'Confirmado';

        pagamentoDao.atuliza(pagamento, function(error, resultado) {

        });
    });

    app.post('/pagamentos/pagamento', function(req, res) {
        req.assert("forma_de_pagamento", "Forma de pagmento é obrigatório").notEmpty();

        req.assert("valor", "Valor é obrigatório e deve ser deciomal").notEmpty().isFloat();

        var erros = req.validationErrors();

        if(erros) {
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }

        var pagamento = req.body;
        console.log('Processando uma requisição de um novo pagamento.');

        pagamento.status = 'Criado';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(error, resultado){
            if(error) {
                console.log('Error ao inserir ao banco: ',error);
                res.status(500).send(error);
            } else {
                console.log('Pagamento criado.');

                res.location('/pagamentos/pagamento/', resultado.insertId);
                
                res.status(201).json(pagamento);
            }            
        });

        //res.send(pagamento);
    });
}

/*
100 Continue: o servidor recebeu a solicitação e o cliente pode continuar a comunicação.
200 Ok: tudo ocorreu como esperado.
201 Created: um novo recurso foi criado no servidor.
301 Moved: a url solicitada foi movida.
400 Bad Request: problemas na requisição do cliente.
404 Not Found: a url solicitada não foi encontrada.
500 Internal Server Error: algo inesperado aconteceu do lado do servidor.

Note que cada centena corresponde à uma categoria específica de informação. 
A família do 100 indica uma conexão continuada. A família do 200 indica sucesso. 
300 significa redirecionamento. 400 é para erro do cliente e finalmente a família do 
500 é usada para informar outros erros, em sua maioria do lado do servidor.

*/