# Activer le formulaire de contact

Le formulaire de contact utilise [Web3Forms](https://web3forms.com) (gratuit, 100 % statique, sans backend ni compte payant — 250 envois/mois).

1. Rendez-vous sur https://web3forms.com et générez une clé d'accès gratuite (saisissez simplement l'email de réception).
2. À la racine du projet, copiez `.env.example` vers `.env.local`.
3. Collez la clé reçue dans `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=` dans `.env.local`.
4. Redémarrez le serveur de dev (`npm run dev`) pour que la variable soit prise en compte.
5. Sans clé configurée, le formulaire affiche automatiquement un repli avec un lien email (mailto).
