#default
ytt -f values-default.yml -f values-schema.yml -f ./templates | kubectl apply -f - --namespace=default
