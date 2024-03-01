from django.shortcuts import render
from django.http import HttpResponse
from transformers import AutoModelForQuestionAnswering, BertTokenizer
import torch

def home(request):
    return render(request, 'home.html')

model_name = 'bert-large-uncased-whole-word-masking-finetuned-squad'
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

# Get the answer from the model
def reply(question):
    tokenizer = BertTokenizer.from_pretrained(model_name)
    context = '''
    I'm Yuka. I live in Canada. 
    I'm a software developer.
    I'm interested in AI/ML, web development, and cloud computing.
    I like travelling and reading.
    '''
    inputs = tokenizer.encode_plus(question, context, add_special_tokens=True, return_tensors="pt")
    input_ids = inputs["input_ids"].tolist()[0]
    output = model(**inputs)
    answer_start = torch.argmax(output.start_logits)  
    answer_end = torch.argmax(output.end_logits) + 1 
    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))
    answer = answer.replace('[CLS]', '')
    answer = answer.replace('[SEP]', '')
    return answer

# Make the bot respond to the user input
def bot_response(request):
    input_data = request.POST.get('input_text')
    if not input_data:
        return HttpResponse('<h2>No data found</h2>', status=400)    

    bot_response = reply(input_data)
    http_response = HttpResponse()
    http_response.write(f"BOT:{bot_response}")

    return http_response
