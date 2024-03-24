# base image
FROM python:3.9-slim

# workdir
WORKDIR /app

# copy dependencies file
COPY requirements.txt /app/

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . /app/

# collect static files
RUN python manage.py collectstatic --noinput

# expose port
EXPOSE 8000

# run server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "chatbot.wsgi"]
