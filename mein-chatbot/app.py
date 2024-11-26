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
# app.py (Erweiterung des Chat-Endpunkts)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Keine Nachricht bereitgestellt.'}), 400

        user_input = data['message']
        print(f"Empfangene Nachricht: {user_input}")

        # Definiere den System-Prompt
        system_prompt = "Du bist ein freundlicher und hilfsbereiter Assistent, der präzise und klare Antworten gibt."

        # Kombiniere System-Prompt und Benutzeranfrage
        full_prompt = f"{system_prompt}\n\nBenutzer: {user_input}\nAssistent:"

        # Führe die Abfrage mit LlamaIndex durch
        response = query_engine.query(full_prompt)
        print(f"Generierte Antwort: {response}")

        return jsonify({'response': str(response)}), 200

    except Exception as e:
        print(f"Fehler bei der Verarbeitung der Anfrage: {e}")
        return jsonify({'error': 'Ein Fehler ist aufgetreten.'}), 500

if __name__ == '__main__':
    app.run()



