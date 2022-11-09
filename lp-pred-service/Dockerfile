FROM python:3.10.8
ADD . /lp-pred-service
WORKDIR /lp-pred-service
COPY . .
EXPOSE 8080
ENV PORT 8080
ENV HOST 0.0.0.0
RUN python3 -m pip install -r requirements.txt
CMD ["python3", "server.py"]