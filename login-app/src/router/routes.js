const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },  // Página de Login
      { path: '/movies', component: () => import('pages/MoviesPage.vue') }, // Página de Movies
    ],
  },
];

export default routes;