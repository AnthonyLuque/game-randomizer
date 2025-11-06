# L'interface de l'application

## La page principale (pour tirer au sort un jeu)
<img width="2537" height="1231" alt="Game randomizer main page" src="https://github.com/user-attachments/assets/dce97dd6-8bb3-46f3-8021-8534227376bd" />

## La page des paramètres (pour manipuler les données)
<img width="2557" height="1233" alt="Game randomizer settings page" src="https://github.com/user-attachments/assets/133b381c-a0f5-41e8-a713-fa26178d1ef1" />



# Lancer l'application en local
Cette section de ce README permet de lancer le projet en local. Il s'agit d'un projet avec un frontend Angular, un backend Java/Spring et une base de données PostgreSQL.

## Docker et la base de données

D'abord, lancer **Docker Desktop**.

Puis :
Démarrer PostgreSQL	(depuis ```backend/```, à l'endroit où se trouve le ```docker-compose.yml```)
```
docker compose up -d
```

## Le back

Commande pour lancer le backend Java (depuis ```backend/```)
```
mvnw spring-boot:run
```

## Le front

Commande pour lancer le frontend Angular (depuis ```frontend/```)
```
ng serve
```
