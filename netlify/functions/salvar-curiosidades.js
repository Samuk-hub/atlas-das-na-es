const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event, context) => {
  // Mantém a conexão viva para próximas requisições
  context.callbackWaitsForEmptyEventLoop = false;

  // Cabeçalhos CORS para permitir requisições do frontend
  const headers = {
    'Access-Control-Allow-Origin': '*', // Em produção, troque '*' pela URL do seu site
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Responde ao "preflight" do navegador antes de uma requisição POST
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Garante que a função só aceite requisições POST para salvar dados
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ error: 'Método não permitido. Use POST.' }) 
    };
  }

  try {
    // Pega os dados enviados pelo frontend
    const dados = JSON.parse(event.body);

    // Validação simples (garante que enviaram o texto da curiosidade)
    if (!dados.texto) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: 'O texto da curiosidade é obrigatório.' }) 
      };
    }

    const client = await connectToDatabase();
    const database = client.db('meu_banco'); // Nome do seu banco
    const collection = database.collection('curiosidades'); // Nova coleção

    // Monta o objeto que será salvo no banco
    const novaCuriosidade = {
      texto: dados.texto,
      categoria: dados.categoria || 'Geral',
      dataCriacao: new Date() // Salva o dia e hora exatos
    };

    const resultado = await collection.insertOne(novaCuriosidade);

    return {
      statusCode: 201, // 201 significa "Criado com sucesso"
      headers,
      body: JSON.stringify({ 
        message: 'Curiosidade salva com sucesso!', 
        id: resultado.insertedId 
      })
    };

  } catch (error) {
    console.error('Erro no banco:', error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: 'Erro interno ao salvar no banco de dados.' }) 
    };
  }
};