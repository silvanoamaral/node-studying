module.exports = function( app ) {
    app.get('/pagamentos', function(req, res) {
        console.log('Recebida requisição de teste na porta 5000.')
        res.send('Ok');
    });
}