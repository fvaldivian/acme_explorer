# Instrucciones

## Hay que crear unas credenciasles de usuario en 
aws web console 
-> mi cuenta(arriba a la derecha)
-> credenciales de seguridad 
-> usuarios 
-> se entra en el usuario
-> se va a la pestaña credenciales de seguridad
-> claves de acceso
-> crear clave de acceso
-> interfaz de línea de comandos (cli)
-> aceptar las condiciones
-> siguiente
-> indicar el nombre
-> clic en botón crear clave de acceso

## Hay que tener instalada la aws cli
## En windows, con un usuario llamado JUANE, después de instalar se generan unos archivos en 
C:\Users\JUANE\.aws\credentials
C:\Users\JUANE\.aws\config

## En el archivo .env, basándose en .env.example, hay que configurar los puertos de los servicios y las credenciales de aws y firebase

## Hay que tener un archivo aws-key-pair.pem en la carpeta credentials

## Una vez configurado todo, con cloudformation-stack-create.sh se puede crear la pila

## Cuando el proceso de creación termine debería mostrar las urls, si no las muestra se pueden revisar los logs en la carpeta log para encontrar pistas del error

## Cuando ya se haya creado la pila se puede entrar en la máquina ec2 con dockerhost-login.sh

## Puede tardar varios minutos para que los contenedores estén desplegados

## En el dockerhost se puede ver el avance de la instalación con el comando 
sudo su
tail -f /home/ubuntu/dockerhost-setup.log