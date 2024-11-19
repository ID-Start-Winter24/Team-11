import os
import time
import gradio as gr
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage, PromptTemplate
from llama_index.llms.openai import OpenAI
from llama_index.core import Settings



path_res = "./res"
path_persist = os.path.join(path_res, "persist")

Settings.llm = OpenAI(temperature=0.1, model="gpt-4o-mini")

if not os.path.exists(path_persist):
    documents = SimpleDirectoryReader("./res/").load_data()
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
    "Given only this information and without using ur general knowledge, please answer the question: {query_str}\n"
    "Du bist ein alter weiser Zauberer und deine Aufgabe ist es Schülern bei der Suche nach ihrem Traumstudium zu unterstützen!\n"
    "Bitte verhalte dich entsprechend. Dein Name ist Studini.\n"
)
qa_template = PromptTemplate(template)
query_engine = index.as_query_engine(streaming=True, text_qa_template=qa_template)


def response(message, history):
    streaming_response = query_engine.query(message)

    answer = ""
    for text in streaming_response.response_gen:
        time.sleep(0.05)
        answer += text
        yield answer

def main():
    with gr.Blocks(css_paths = "./main.css",) as main:

        gr.Markdown("# Studini hilft dir!")

        with gr.Row():
            with gr.Column(scale=1):
                name = gr.Textbox(label="Name")
                alter = gr.Textbox(label="Alter")
                city = gr.Textbox(label="Stadt")
                need_help = gr.Button(value="Ich brauche Hilfe", elem_id="Test")
                need_help.click(outputs="Hilfe ist unterwegs!")
            with gr.Column(scale=3):
                chatbot_fenster = gr.Chatbot(
                    type="messages",
                    elem_id="CHAT",
                    height=500,
                )
                chatbot = gr.ChatInterface(
                    chatbot = chatbot_fenster,
                    fn=response,
                    type="messages",)

    
    
    main.launch(inbrowser=True)


if __name__ == "__main__":
    main()
