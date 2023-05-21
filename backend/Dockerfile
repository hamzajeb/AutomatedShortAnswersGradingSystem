# init a base image
FROM python:3.9
#define the present working directory
WORKDIR /app
# copy the contents into the working dir
ADD . /app
# run pip to install the dependencies of the flask app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

