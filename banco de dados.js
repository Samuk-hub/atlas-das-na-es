const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // A URL de conexão virá de uma variável de ambiente (segura)
  const uri = process.env.MONGODB_URI; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('meu_banco');
    const collection = database.collection('usuarios');

    // Exemplo: Buscar todos os usuários
    const dados = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(dados)
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  } finally {
    await client.close();
  }
};