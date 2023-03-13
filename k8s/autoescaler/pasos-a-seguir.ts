/***
 * 
 * (El archivo 05-hpa.yml no esta funcionando :(  )
 * 
 * Este despliegue se puede realizar en un el namespace default es necesario usar apply-default
 * Primero hay que asegurarse de tener desplegado el servicio de metric service en kube-system
 * codigo------> kubectl get pods -n kube-system
 * 
 * luego de desplegar todos los pods y que esten (ready 1/1)
 * se puede autoescalar un deployment, en este caso el api-acme-explorer
 * en este caso se  hara un hpa, autoescalado horizontal, escogiendo un recurso por defecto de CPU, tambien se puede esccoger por memoria.
 * codigo--------> kubectl autoscale deployment acme-explorer-api-deployment --cpu-percent=50 --min=1 --max=10
 * 
 * Para comporbar que esta funcionando las metricas en el cmapo TARGET tiene que aparecer 0%/50% siendo 0% el CPU usado por la api, y el 50% el criterio definido para dividir la carga, cuando esta se vea superada comenzara a crear mas pods para dividir la carga, posteriormente el valor de TARGET ira decrementando
 * 
 * Para ver los hpa sse utiliza: --------> kubectl get hpa 
 * 
 * Se veria algo como lo siguiente (en caso que en vez de 0 diga unknow es que no esta reconociendo las metricas correctamente, ten en cuenta que puede tardar hasta 2 minutos en desplegarse correctamente el autoescalador, se recomienda esperar un rato,  hasta determinar si esta reconociendo metrics-server o no)
 * 
 *  REFERENCE                                 TARGET    MINPODS   MAXPODS   REPLICAS   AGE
 * php-apache   Deployment/php-apache/scale   0% / 50%     1         10        1       18s
 * 
 * Para monitorear el despliegue de los pods se utiliza el comando: ---> kubectl get pods --watch
 * Para ver como va subiendo el porcentaje de autoescalar se usa el siguinte comando: ----> kubectl get hpa --watch
 */