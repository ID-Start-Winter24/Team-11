import os
from flask import Flask, request, jsonify
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage, PromptTemplate
from llama_index.llms.openai import OpenAI
import openai
from flask_cors import CORS
import requests 

reply = requests.post(url="https:/", json={"":""})

app = Flask(__name__)
CORS(app)

# Setze deinen OpenAI API-Schlüssel
openai.api_key = os.getenv('OPENAI_API_KEY')

path_modulhandbuch = "./data"
path_persist = os.path.join(path_modulhandbuch, "persist")

#print(openai.api_key)

if not os.path.exists(path_persist):
    documents = SimpleDirectoryReader("./data/").load_data()
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=path_persist)
else:
    storage_context = StorageContext.from_defaults(persist_dir=path_persist)
    index = load_index_from_storage(storage_context)

template = (
    "We have provided context information below. \n"
    "---------------------\n"
    "{context_str}"
    "\n---------------------\n"
    "Given mainly this information and avoid using ur general knowledge, please answer the question: {query_str}\n"
    "Deine Aufgabe ist es Schülern bei der Suche nach ihrem Studium zu unterstützen!\n"
    "Antworte kurz und prägnant in höchstens 2 Sätzen außer es wird extra nach mehr infos gefragt.\n"
    "Bitte verhalte dich entsprechend.\n"
)
qa_template = PromptTemplate(template)
query_engine = index.as_query_engine(streaming=True, text_qa_template=qa_template)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = query_engine.query(user_input)
    return jsonify({'response': str(response)})

@app.route('/', methods=['GET'])
def welcome():
    return jsonify({'response': "Hallo! Ich bin ein Studienberater-Bot. Wie kann ich dir helfen, dein Studium an der Hochschule München zu finden? Bitte bedenke, dass ich nur ein Prototyp bin :)"})


if __name__ == '__main__':
    app.run(host='0.0.0.0')