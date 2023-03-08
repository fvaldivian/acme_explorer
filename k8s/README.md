## Descargar la templating tool ytt

Descargar la versión más reciente yendo a la url indicada abajo, desplegar assets y descargar <code>ytt-windows-amd64.exe</code>.

<https://github.com/carvel-dev/ytt/releases>

## Comprobar integridad de la descarga

En una terminal de git comparar el hash del archivo descargado con el que se indica en la página de las descargas para asegurarse que se descargó correctamente

```
shasum -a 256 ~/Downloads/ytt-darwin-amd64.exe
```

## Crear variable de entorno

Colocar archivo <code>ytt.exe</code> en alguna ruta, por ejemplo <code>C:\ytt\ytt.exe</code>.

Luego modificar el path en las variables de entorno para incluir esa carpeta <code>C:\ytt</code>

## Comprobar la disponibilidad 

Abrir una nueva terminal y verificar que está instalado.

```
ytt version
```

## Configurar los entornos

Crear los archivos de variables de entorno para producción y para desarrollo basados en <code>values-schema.yml</code>.

```
cp values-schema.yml values-dev.yml
cp values-schema.yml values-prod.yml
```

Asignarle a cada una los valores de las variables, cambiando los puertos, entorno y colocándole los sufijos -prod o -dev según sea el caso.

## Configurar variables relacionadas a los namespaces

Es importante mencionar la manera de editar estas variables.

Para desarrollo sería:

```
NAMESPACE: "development"
DEFAULT_BACKEND_SERVICE: "--default-backend-service=development/acme-explorer-api-service"
```

Para producción sería:

```
NAMESPACE: "production"
DEFAULT_BACKEND_SERVICE: "--default-backend-service=production/acme-explorer-api-service"
```

Es importante destacar que estos namespaces "development" y "production" son también referenciados en los archivos <code>apply.sh</code> y <code>delete.sh</code> 

## Desplegar

```
sh apply.sh
```

## Eliminar

```
sh delete.sh
```