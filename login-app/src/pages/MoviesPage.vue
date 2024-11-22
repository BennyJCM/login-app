<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Listado de Películas</q-toolbar-title>
    </q-toolbar>

    <!-- Barra de búsqueda -->
    <q-input
      v-model="searchQuery"
      label="Buscar películas"
      outlined
      debounce="300"
      @input="fetchMovies"
      class="q-my-md"
    />

    <!-- Selector de orden -->
    <q-select
      v-model="sortBy"
      label="Ordenar por"
      outlined
      :options="sortOptions"
      @input="fetchMovies"
      class="q-my-md"
    />

    <!-- Listado de películas -->
    <q-list>
      <q-item v-for="movie in movies" :key="movie.id" clickable>
        <q-item-section avatar>
          <img
            :src="getPosterUrl(movie.poster_path)"
            alt="Póster"
            style="width: 50px; height: 75px;"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ movie.title }}</q-item-label>
          <q-item-label caption>
            ⭐ {{ movie.vote_average }} | 🗳️ {{ movie.vote_count }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Mensaje de error -->
    <q-banner v-if="movies.length === 0 && !loading" class="q-mt-md" color="warning">
      No se encontraron películas.
    </q-banner>

    <!-- Indicador de carga -->
    <q-spinner color="primary" size="lg" v-if="loading" />

    <!-- Paginación -->
    <q-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :max="totalPages"
      @update:model-value="fetchMovies"
      class="q-my-md"
    />
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: 'https://api.themoviedb.org/3/discover/movie',
      apiKey: '6609b89f45072233c39a33c1d447ed4f',
      movies: [],
      searchQuery: '',
      sortBy: 'popularity.desc',
      sortOptions: [
        { label: 'Popularidad (desc)', value: 'popularity.desc' },
        { label: 'Popularidad (asc)', value: 'popularity.asc' },
        { label: 'Fecha de lanzamiento (desc)', value: 'release_date.desc' },
        { label: 'Fecha de lanzamiento (asc)', value: 'release_date.asc' },
        { label: 'Calificación (desc)', value: 'vote_average.desc' },
        { label: 'Calificación (asc)', value: 'vote_average.asc' },
      ],
      currentPage: 1,
      totalPages: 1,
      loading: false,
    };
  },
  methods: {
    async fetchMovies() {
      this.loading = true; // Muestra el spinner
      try {
        const params = {
          api_key: this.apiKey,
          language: 'es-PE',
          sort_by: this.sortBy,
          query: this.searchQuery,
          page: this.currentPage,
        };

        const response = await axios.get(this.apiUrl, { params });
        this.movies = response.data.results || [];
        this.totalPages = response.data.total_pages || 1;
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      } finally {
        this.loading = false; // Oculta el spinner
      }
    },
    getPosterUrl(posterPath) {
      return `http://image.tmdb.org/t/p/w500${posterPath}`;
    },
  },
  mounted() {
    this.fetchMovies(); // Carga inicial de películas
  },
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
