import os
from flask import Flask, request, jsonify
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, PromptTemplate
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Setze deinen OpenAI API-Schlüssel
openai.api_key = os.getenv('OPEN_AI_KEY')

# Lade Dokumente und erstelle den Index
documents = SimpleDirectoryReader('data').load_data()
index = VectorStoreIndex(documents)

template = (
    "We have provided context information below. \n"
    "---------------------\n"
    "{context_str}"
    "\n---------------------\n"
    "Given mainly this information and avoid using ur general knowledge, please answer the question: {query_str}\n"
    "Deine Aufgabe ist es Schülern bei der Suche nach ihrem Traumstudium zu unterstützen!\n"
    "Bitte verhalte dich entsprechend. Dein Name ist Studini. Erwähne nie mehr Tourismus\n"
)
qa_template = PromptTemplate(template)
query_engine = index.as_query_engine(streaming=True, text_qa_template=qa_template)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = query_engine.query(user_input)
    return jsonify({'response': str(response)})

if __name__ == '__main__':
    app.run()



