# SUZTECH

SUZTECH est une plateforme Laravel + Inertia dediee a la presentation des services SUZTECH, a la boutique produits et a l'administration interne. Le projet met en avant des services informatiques, du design et de l'accompagnement administratif au Benin.

## Mission et positionnement

SUZTECH accompagne ses clients avec une approche simple :

- Efficacite : livrer des solutions rapides, stables et utiles.
- Securite : proteger les donnees et reduire les surfaces de risque.
- Partenariat : accompagner de la demande initiale jusqu'a l'exploitation.
- Excellence : maintenir un niveau de qualite propre en frontend, backend et operations.

## Domaines d'expertise

- Developpement web moderne avec Laravel, Inertia.js et React.
- Boutique et vitrines digitales optimisees pour la performance.
- Conseil IT, maintenance et accompagnement technique.
- Services administratifs et prestations numeriques.

## Equipe dirigeante

- HOUNGBO Tobias : CEO et strategie.
- AGBOTON Kreesten : developpement web lead.
- Evrard SOKENOU : comptabilite et finances.

## Liens utiles

- LinkedIn SUZTECH : <https://www.linkedin.com/company/suztech/>
- Email SUZTECH : <mailto:Suztech7@gmail.com>
- Facebook : <https://www.facebook.com/profile.php?id=100086739134224>
- X : <https://x.com/SUZTECH2?t=hh-GpztTL6dZBrQmsJbIWw&s=08>
- Instagram : <https://www.instagram.com/suztech2?igsh=MTVvOXMwb3RlaHp2dw==>
- WhatsApp : <https://wa.me/22961012941>
- YouTube : <https://youtube.com/@suztech?si=fg27sf30vr66OXrX>

## Stack technique

- Backend : Laravel 12, PHP 8.2, MySQL
- Frontend : React 18, Inertia.js v2, Vite 7, Tailwind CSS v3
- Tests : Pest PHP
- Runtime production : Docker, PHP-FPM, Nginx, Render.com

## Installation et developpement local

### Prerequis

- PHP 8.2+
- Composer 2+
- Node.js 20+
- MySQL 8+ ou MariaDB compatible

### Installation

```bash
cp .env.example .env
composer install
npm install
php artisan key:generate
```

### Configuration de la base

Renseignez les variables MySQL dans `.env`, puis lancez :

```bash
php artisan migrate
php artisan storage:link
```

`storage:link` est indispensable pour exposer les images produits stockees sur le disque `public`.

### Lancer l'application

Dans un terminal :

```bash
php artisan serve
```

Dans un second terminal :

```bash
npm run dev
```

L'application est ensuite disponible sur `http://127.0.0.1:8000`.

### Lancer les tests

```bash
php artisan test
```

Ou seulement la suite feature :

```bash
php artisan test --testsuite=Feature
```

## Authentification et architecture

- L'authentification publique est geree par `CustomAuthController` dans `routes/web.php`.
- Le fichier `routes/auth.php` est conserve comme trace documentaire mais n'est plus charge par `bootstrap/app.php`.
- Les routes Breeze de reinitialisation / confirmation de mot de passe ne sont donc pas exposees.

## Deploiement Render.com

### Mode de deploiement

Le projet est concu pour etre deploie via le `Dockerfile` racine. Render construit l'image puis execute le conteneur Nginx + PHP-FPM inclus.

### Variables d'environnement requises

Copiez `.env.production.example` comme base et renseignez au minimum :

- `APP_KEY`
- `APP_URL`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_MAILER`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_FROM_ADDRESS`
- `MAIL_FROM_NAME`
- `SESSION_SECURE_COOKIE=true`
- `LOG_CHANNEL=stderr`
- `QUEUE_CONNECTION=sync`
- `VITE_FORMSPREE_URL`

### Checklist de mise en production

1. Creer le service web Render a partir du depot.
2. Laisser Render construire l'image via le `Dockerfile`.
3. Renseigner les variables d'environnement de production.
4. Executer les migrations :

```bash
php artisan migrate --force
```

5. Verifier la sante du service via `/up`.
6. Tester les e-mails de verification et les parcours admin.

### Uploads et restauration des medias

Les images produits sont stockees sur le disque Laravel `public`, donc sous `storage/app/public/products`.

En production, deux strategies possibles :

- Monter un volume persistant sur le repertoire de stockage si vous gardez le disque local.
- Externaliser les medias vers un service objet/CDN. La variable `CLOUDINARY_URL` est documentee dans `.env.production.example` pour ce cas.

Si vous restaurez une sauvegarde locale des uploads :

```bash
php artisan storage:link
```

Puis recopiez le contenu sauvegarde dans `storage/app/public/` avant de remettre le trafic.

### Mail et verification d'email

La verification d'email Laravel est active. Le SMTP de production doit donc etre configure avant ouverture publique, sinon les nouveaux comptes ne recevront pas leur lien de verification.

## Notes operations

- Les caches Laravel (`config`, `route`, `view`, `event`) sont chauffes au build Docker.
- OPcache est active en production.
- Les assets Vite sous `/build/` sont servis avec des headers cache `immutable`.
- `VITE_FORMSPREE_URL` est un parametre frontend compile au build. Si vous le changez sur Render, rebuild obligatoire.
