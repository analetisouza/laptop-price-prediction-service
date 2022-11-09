# Laptop Price Prediction Service

This project was developed with the intention of practicing the engineering aspect of machine learning, in transforming a notebook to production-ready code, wrap it around a larger system and deploy it. The four steps I took were: Developing the machine learning model, transforming it in a back-end service and build a REST API, develop a front-end interface, connect it all and serve it to the cloud.

### Machine Learning Model

In this phase, I used a jupyter notebook with python, pandas, pandas-profiling, matplotlib, scikit-learn, xgboost and lightgbm to make experiments, and use pickle to save the best performing model. 

### Back-end

Next, with python, flask and I developed the service that uses the previously selected model to make predictions and made it available with a REST API.

### Front-end

The interface is basically a form where the data can be filled for the prediction, and for that I used react.js and axios for the request. 

### Deployment

For the back-end deployment, I chose GCP. With a docker container, I stored it on Artifact Registry through Cloud Build. Then, I chose to make the service serverless and made it available on Cloud Run. For the API, I used the API Gateway service to connect Cloud Run to the front-end. Finally, to put the website in production, I used the App Engine service. 

The final product can be acessed at: https://laptop-prediction-service.ue.r.appspot.com/

## Considerations: 

- The whole application is not as optimized as it could be. The model is not the most accurate, the back-end model is not running the fastest, the interface is not the most adaptable. All of those were decisions I wilingly made to make sure I would get to reach an end result. Still, there is room for improvement and I may or may not keep on working on this project if I find it valuable for my learning, or just simply move on to the next one. 
