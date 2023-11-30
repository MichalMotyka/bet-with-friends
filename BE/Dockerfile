FROM python:3.8-slim-buster

WORKDIR /python-docker

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y build-essential

RUN pip3 install -r requirements.txt

Expose 5000:5000

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]