Ce README permet de lancer le projet en local. Il s'agit d'un projet avec un frontend Angular, un backend Java/Spring et une base de données PostgreSQL.



# Backend

Commande pour lancer le backend Java
```
mvnw spring-boot:run
```

# Frontend
Commande pour lancer le frontend Angular
```
ng serve
```


# Docker

D'abord, lancer **Docker Desktop**.

Puis :
Démarrer PostgreSQL	(dans ```backend/```, à l'endroit où se trouve le ```docker-compose.yml```)
```
docker compose up -d
```

Lister tous les conteneurs actifs
```
docker ps
```

Arrêter PostgreSQL	
```
docker compose down
```


# PostgreSQL lancé avec Docker

## Infos de connexion
```
nom d'utilisateur : postgres
mdp admin : admin123
port : 5432 (par défaut)
```

## Serveur lancé via Docker
Pour vérifier que c'est bien le conteneur Docker qui tourne (et pas PostgreSQL en local) :
```
SELECT version();
```
Il devrait être écrit Debian ou Linux dans le resultat :
```
PostgreSQL 16.10 (Debian 16.10-1.pgdg13+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 14.2.0-19) 14.2.0, 64-bit
```

## Volume Docker
Docker stocke les données de la base de données dans un volume.
Dans le ```docker-compose.yml```, il correspond à cette ligne :
```docker-compose
volumes:  
  - postgres_data:/var/lib/postgresql/data
```

Pour vérifier que le volume existe :
```
docker volume ls
```
On voit bien le volume en question :
```
DRIVER    VOLUME NAME
local     backend_postgres_data
```

