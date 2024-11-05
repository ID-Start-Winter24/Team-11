import gradio as gr

with gr.Blocks() as demo:

    gr.Markdown("# Studini hilft dir!")

    with gr.Row():
        with gr.Column():
            name = gr.Textbox(label="Name")
            alter = gr.Textbox(label="Alter")
            city = gr.Textbox(label="Stadt")
        with gr.Column():
            chatbot = gr.Chatbot()
            with gr.Row():
                input = gr.Textbox()
                submit = gr.Button(value="Submit")
demo.launch(inbrowser=True)