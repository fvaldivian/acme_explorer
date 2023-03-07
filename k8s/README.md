# Instalar la templating tool ytt
# En windows, en la versión más reciente desplegar assets y descargar ytt-windows-amd64.exe

https://github.com/carvel-dev/ytt/releases

# En una terminal de git comparar el hash del archivo descargado con el que se indica en la página de las descargas para asegurarse que se descargó correctamente

shasum -a 256 ~/Downloads/ytt-darwin-amd64.exe

# Después hay que poner ese archivo .exe en alguna ruta, por ejemplo C:\ytt\ytt.exe 

# Después modificar las variables de entorno para incluir esa carpeta C:\ytt

# Luego al abrir una nueva terminal se puede verificar que está instalado con
ytt version



