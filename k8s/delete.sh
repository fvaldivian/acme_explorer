#development
ytt -f values-dev.yml -f values-schema.yml -f ./templates | kubectl delete -f - --namespace=development

#production
ytt -f values-prod.yml -f values-schema.yml -f ./templates | kubectl delete -f - --namespace=production