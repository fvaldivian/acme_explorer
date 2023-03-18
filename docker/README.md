## Configurar los entornos

Crear los archivos de variables de entorno para producción y para desarrollo basados en <code>.env.example</code>.

```
cp .env.example .env.dev
cp .env.example .env.prod
```

Asignarle a cada uno los valores de las variables, cambiando los puertos y entorno según sea el caso.

## Desplegar

```
sh docker-compose-build.sh
```

## Eliminar

```
sh docker-compose-destroy.sh
```