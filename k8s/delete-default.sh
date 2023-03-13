#default
ytt -f values-default.yml -f values-schema.yml -f ./templates | kubectl delete -f - --namespace=default
