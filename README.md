# AI Chatbot App with BERT

This Chatbot application utilizes the BERT model to understand and respond to user queries in a conversational manner.

## Features

- User-friendly web interface
- Utilizes a fine-tuned BERT model
- Docker support

![screenshot](https://github.com/yukaty/chatbot-app/assets/254470/57950aca-39e7-4d76-9742-e426e47187c0)


## Setup

1. Clone the Repository
   ```bash
   git clone https://github.com/yukaty/chatbot-app.git
   cd chatbot-app
   ```

2. Start the Application
   Use Docker Compose to build and start the application:

    ```bash
    docker-compose up --build -d
    ```

   Visit `http://localhost:5173` in your browser.

The initial response from the chatbot may take some time, as the model needs to load and process the input for the first time. Subsequent interactions should be faster.

## How It Works

The chatbot application processes user input through the backend, which utilizes the `bert-large-uncased-whole-word-masking-finetuned-squad` model to generate a response based on a predefined context about me.
