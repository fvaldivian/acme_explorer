## Crear credenciasles de usuario de aws 

```
aws web console 
-> mi cuenta(arriba a la derecha)
-> ir a credenciales de seguridad 
-> ir a usuarios 
-> entrar en el usuario
-> ir a la pestaña credenciales de seguridad
-> seleccionar claves de acceso
-> crear clave de acceso
-> seleccionar interfaz de línea de comandos (cli)
-> aceptar las condiciones
-> hacer clic en siguiente
-> indicar el nombre
-> hacer clic en botón crear clave de acceso
```

## Instalar aws cli

Hay que tener instalada la aws cli. Se trata de descargar un .exe y ejecutarlo según la documantación oficial.

<https://docs.aws.amazon.com/es_es/cli/latest/userguide/getting-started-install.html>

En windows, una vez instalada, con un usuario llamado "JUANE", se pueden encontrar configurados los siguientes archivos:

```
C:\Users\JUANE\.aws\credentials
C:\Users\JUANE\.aws\config
```

## Obtener archivo .pem de aws

Colocar el archivo aws-key-pair.pem en la carpeta credentials. Eso se crea y descarga de aws en ec2. 

```
./credentials/aws-key-pair.pem
```

## Bucket público y privado

En distintos archivos hay referencias y se espera que existan 2 buckets que permiten el funcionamiento del despliegue.

```
s3://bucket-usevilla-do-2023-private/
s3://bucket-usevilla-do-2023-public/
```

El bucket <code>s3://bucket-usevilla-do-2023-private</code> debe ser privado y servirá para almacenar archivos que pueden contener datos sensibles.

El bucket <code>s3://bucket-usevilla-do-2023-public</code> debe tener habilitada la opción Access control list (ACL), para poder crear archivos públicos.

Los nombres de los buckets pueden ser modificados, pero de hacerse, debe hacerse en todas las referencias que hayan en los archivos de despliegue.

## Configurar los entornos

Crear el archivo de variables de entorno basado en <code>.env.example</code>.

```
cp .env.example .env
```

Configurar los puertos de los servicios y las credenciales de aws y firebase.

## Crear la pila

```
sh cloudformation-stack-create.sh
```

## Obtener urls de despliegue

Cuando el proceso de creación termine debería mostrar las urls.

Si no las muestra se pueden revisar los logs en la carpeta log para encontrar pistas del error:

```
logs/aws-cli.log
logs/s3.log
```

## Ingresar en el host ec2

Cuando ya se haya creado la pila se puede entrar en la máquina 

```
ec2 con dockerhost-login.sh
```

## Ver el avance de la instalación

Puede tardar varios minutos para que los contenedores estén desplegados.

Una vez dentro de la máquina de ec2 se puede ver el avance de la instalación:

```
sudo su
tail -f /home/ubuntu/dockerhost-setup.log
```

## Eliminar la pila

```
sh cloudformation-stack-delete.sh
```