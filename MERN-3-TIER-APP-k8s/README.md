Apply order (commands)

kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml

kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

kubectl apply -f mongo-express-deployment.yaml
kubectl apply -f mongo-express-service.yaml



kubectl get pods
kubectl get svc
