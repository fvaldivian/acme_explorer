## Fuente

<https://github.com/kubernetes/dashboard>

y 

<https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md>

## Instalar

```
sh apply.sh
```

## Generar token de autenticación

Este token hay que copiarlo para el siguiente paso.

```
sh get-token.sh
```

## Iniciar el servidor web 

```
sh start.sh
```
Eso debería abrir la url del dashboard en el navegador, si no se abre, la url es

<http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/>

## Eliminar

```
sh delete.sh
```


