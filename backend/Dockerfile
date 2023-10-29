FROM python:3.9.18-alpine3.18

WORKDIR /app
COPY ["./backend/requirements.txt", "./"]
RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
