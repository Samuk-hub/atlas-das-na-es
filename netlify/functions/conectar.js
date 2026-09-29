const { MongoClient } = require('mongodb');

// Reutiliza a conexão existente se a função for chamada novamente (melhora performance)
let clientCached = null;

async function getDatabase() {
  if (!clientCached) {
    clientCached = new MongoClient(process.env.MONGODB_URI);
    await clientCached.connect();
  }
  // Altere 'meu_banco' para o nome do seu banco de dados no MongoDB
  return clientCached.db('meu_banco'); 
}

exports.handler = async (event, context) => {
  try {
    const db = await getDatabase();
    // Altere 'minha_colecao' para a coleção que quer consultar
    const collection = db.collection('minha_colecao');

    // Busca os dados no banco
    const resultados = await collection.find({}).toArray();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultados)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: error.message })
    };
  }
};