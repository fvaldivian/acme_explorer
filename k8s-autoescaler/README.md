## Iniciar el k8s-dashboard

Leer las instrucciones en <code>./k8s-dashboard/README.md</code> para poder iniciarlo.

## Desplegar los entornos de production y development de k8s

Leer las instrucciones en <code>./k8s/README.md</code> para poder desplegarlos.

## Configurar recursos

Es importante que la sección de recursos del deployment indique los recursos de cpu a utilizar.

Se puede apreciar esto en <code>./k8s/templates/03-acme-explorer-api-deployment.yaml</code>

En lugar de:

```
resources: {}

```

Se tiene:
```
resources: 
    requests:
    cpu: 50m
    limits:
    cpu: 300m   
```

## Configurar un autoescalado horizontal a través de comando 

Se va a configurar al deployment <code>acme-explorer-api-deployment</code> en el namespace development.

```
kubectl autoscale deployment acme-explorer-api-deployment --cpu-percent=50 --min=1 --max=10 -n development
```

## Verificar la configuración

Para verificar que se ha configurado correctamente se debe ir a la lista de los deployments en:

```
Dahsboard > Elegir Namespace > Cargas de trabajo > Deployments
```

Hacer clic en el nombre del deployment <code>acme-explorer-api-deployment</code> y bajar hasta la sección <code>Horizontal Pod Autoscalers</code>. 

## Verificar autoescalado

Se hace uso de la herramienta apipecker para causar aumento de la carga para verificar el aumento del número de réplicas.

```
apipecker 50 120 1000 http://localhost:81/v1/actors
```

## Monitorear el aumento del número de pods

Se debe ir a la lista de los deployments del namespace developments.

Se puede apreciar el número de pods del deployment en esa lista, los cambios se reflejan automáticamente sin necesidad de recargar la lista.

Si se desea ver los eventos que van ocurriendo en el deployment se debe hacer clic en el nombre del deployment <code>acme-explorer-api-deployment</code> y bajar hasta la sección eventos. 

Mientras se ejecuta <code>apipecker</code> y poco tiempo después, se pueden apreciar eventos con los mensajes "Scaled up replica set acme-explorer-api-deployment" y "New size: n; reason: cpu resource utilization (percentage of request) above target"

Unos minutos después que termina de ejecutarse <code>apipecker</code> empiezan a ocurrir eventos con los mensajes "Scaled down replica set acme-explorer-api-deployment to n" y "New size: n; reason: All metrics below target"

## Configurar un autoescalado horizontal a través de plantilla <code>.yml</code> 

Se va a configurar al deployment <code>acme-explorer-api-deployment</code> en el namespace production.

```
cd ./k8s-autoescaler
kubectl apply -f templates/hpa.yml
```

## Verificar la configuración

Se hace lo mismo que en el ejemplo anterior pero en el namespace production.

## Verificar autoescalado

Se hace lo mismo que en el ejemplo anterior pero al endpoint del namespace production.

```
apipecker 50 120 1000 http://localhost:82/v1/actors
```

## Monitorear el aumento del número de pods

Se hace lo mismo que en el ejemplo anterior pero en el namespace production.

## Eliminar todo

Eliminar los depliegues de k8s.

```
cd ./k8s/
sh delete.sh
```

Eliminar el k8s-dashboard.

```
cd ./k8s-dashboard/
sh delete.sh
```

Cerrar o terminar la terminal que tiene desplegado el frontend del k8s-dashboard.
