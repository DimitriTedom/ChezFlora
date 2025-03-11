# React + TypeScript + Vite + ShadCN + React-Icons + Zustand + TailwindCSS Template

Officially created for the **Chisfis - Booking Online Project** of **Students of Work Et Yamo**.

Ce template est une base de projet intégrant les meilleures technologies modernes pour construire des applications web rapides, efficaces et maintenables. Il est conçu pour aider les développeurs à démarrer rapidement des projets complexes, tout en garantissant une structure claire et une intégration de plusieurs outils puissants.

## 🚀 Technologies Incluses

- **React** : Une bibliothèque JavaScript populaire pour créer des interfaces utilisateur.
- **TypeScript** : Superset de JavaScript qui ajoute des types statiques pour améliorer la fiabilité et la maintenabilité.
- **Vite** : Un outil de construction rapide pour le développement moderne de projets React.
- **ShadCN/UI** : Une collection de composants UI utilisant Radix UI et TailwindCSS.
- **React-Icons** : Collection d'icônes pour ajouter des éléments visuels attrayants.
- **Zustand** : Une librairie légère pour la gestion de l'état dans React.
- **TailwindCSS** : Un framework CSS utilitaire permettant de créer des designs modernes et responsives facilement.

## ✨ Fonctionnalités

- **Initialisation rapide** avec **Vite**.
- **Gestion d'état fluide** avec **Zustand**.
- **UI moderne** grâce aux composants de **shadcn/ui**.
- **Styling efficace** avec **TailwindCSS**.
- **Icônes réutilisables** grâce à **React-Icons**.

## 📦 Installation

Suivez les étapes ci-dessous pour démarrer avec ce template :

### 1. Clonez le dépôt :

```bash
git clone https://github.com/DimitriTedom/nom-du-repo.git](https://github.com/Worketyamo-Students/My-React-APP_Template-SnowDev.git
cd My-React-APP_Template-SnowDev
```

### 2. Installez les dépendances :

#### Assurez-vous d'être dans le bon dossier, puis installez toutes les dépendances nécessaires :

```bash
npm install
```

### 3. Configurer la base de données avec Prisma :

- Modifiez le fichier `.env` pour y ajouter vos informations de connexion à la base de données.
- Exécutez les migrations pour créer le schéma de base de données :

```bash
npx prisma migrate dev --name init
```

### 4. Lancez le projet en mode développement :

```bash
npm run dev
```

Accédez ensuite à [http://localhost:3000](http://localhost:3000) pour voir le projet en cours d'exécution.

## 🐳 Utiliser Docker (optionnel)

Pour déployer l'application à l'aide de Docker, suivez ces étapes :

### 1. Construire l'image Docker :

```bash
npm run docker-build
```

### 2. Lancer le conteneur :

```bash
npm run docker-run
```

Cela vous permettra de faire tourner l'application dans un conteneur Docker sur le port 3000.

## ⚙️ Scripts Disponibles

Voici quelques scripts utiles pour gérer le projet :

- **`npm run dev`** : Lancer l'application en mode développement.
- **`npm run build`** : Construire l'application pour la production.
- **`npm run start`** : Lancer l'application construite en mode production.
- **`npm run docker-build`** : Construire une image Docker de l'application.
- **`npm run docker-run`** : Lancer l'image Docker construite.

## 📁 Structure du Projet

Voici un aperçu de la structure du projet :

```
mon-template/
├── prisma/               # Dossier des schémas Prisma
│   └── schema.prisma     # Schéma de base de données Prisma
├── src/                  # Code source principal
│   ├── assets/           # Fichiers statiques comme les images
│   ├── components/       # Composants réutilisables de React
│   ├── pages/            # Pages principales de l'application
│   ├── store/            # Store Zustand pour la gestion de l'état
│   └── index.tsx         # Fichier principal pour démarrer React
├── .env                  # Fichier de configuration de l'environnement
├── Dockerfile            # Dockerfile pour la création de l'image
├── package.json          # Dépendances et scripts du projet
└── tailwind.config.js    # Configuration de TailwindCSS
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous avez des idées pour améliorer ce template, n'hésitez pas à forker le dépôt et à soumettre une pull request. Vous pouvez également ouvrir une **issue** si vous rencontrez des problèmes.

### Comment Contribuer :

1. **Forker** le dépôt.
2. **Créer** une nouvelle branche (par exemple, `feature/ma-nouvelle-fonctionnalité`).
3. **Faire** vos modifications.
4. **Pousser** la branche sur votre fork.
5. **Ouvrir** une pull request sur le dépôt d'origine.

## 👤 Template Creator

Créé par : [DimitriTedom alias SnowDev](https://github.com/DimitriTedom)

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

