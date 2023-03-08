# Descargar la templating tool ytt

Descargar la versión más reciente yendo a la url indicada abajo, desplegar assets y descargar ytt-windows-amd64.exe

https://github.com/carvel-dev/ytt/releases

# Comprobar integridad de la descarga

En una terminal de git comparar el hash del archivo descargado con el que se indica en la página de las descargas para asegurarse que se descargó correctamente

shasum -a 256 ~/Downloads/ytt-darwin-amd64.exe

# Crear variable de entorno

Después hay que poner ese archivo .exe en alguna ruta, por ejemplo C:\ytt\ytt.exe 

Luego modificar las variables de entorno para incluir esa carpeta C:\ytt

# Comprobando la disponibilidad 

Abrir una nueva terminal y verificar que está instalado con

ytt version

# Preparando archivos de producción y desarrollo

Hay que crear una copia del archivo values-schema.yml y llamarla values-prod.yml

También hay que crear una copia del archivo values-schema.yml y llamarla values-dev.yml

Asignarle a cada una los valores a las variables cambiando los puertos o colocándole los sufijos -prod o -dev según sea el caso.

# Configurando variables relacionadas a loss namespaces

Es importante mencionar la manera de editar estas variables

Para desarrollo sería

NAMESPACE: "development"

DEFAULT_BACKEND_SERVICE: "--default-backend-service=development/acme-explorer-api-service"

Para producción sería

NAMESPACE: "production"

DEFAULT_BACKEND_SERVICE: "--default-backend-service=production/acme-explorer-api-service"

Es importante destacar que estos namespaces "development" y "production" son también referenciados en los archivos apply.sh y delete.sh 

# Desplegando

Ejecutar el archivo

sh apply.sh

# Eliminando

Ejecutar el archivo

sh delete.sh

