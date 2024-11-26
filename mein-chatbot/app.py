from flask import Flask, request, jsonify
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Setze deinen OpenAI API-Schlüssel
openai.api_key = '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'

# Lade Dokumente und erstelle den Index
documents = SimpleDirectoryReader('data').load_data()
index = VectorStoreIndex(documents)

# Erstelle eine Query Engine
query_engine = index.as_query_engine()

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = query_engine.query(user_input)
    return jsonify({'response': str(response)})

if __name__ == '__main__':
    app.run()



