kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"; echo

#si el comando no funciona, se puede intentar hacer con el comando original del tutorial
#kubectl -n kubernetes-dashboard create token admin-user