<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="Correo electrónico" type="email" />
        <q-input v-model="password" label="Contraseña" type="password" class="q-mt-md" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Login" color="primary" @click="login" />
      </q-card-actions>

      <q-banner v-if="error" class="q-mt-md" color="negative">
        {{ error }}
      </q-banner>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null; // Limpiar errores previos
      try {
        const response = await axios.post('http://68.183.142.21/api/v1/user/signin', {
          email: this.email,
          password: this.password,
        });

        // Verificación de respuesta correcta (código 200)
        if (response.status === 200) {
          console.log('Login exitoso. Redirigiendo a /movies...');
          this.$router.push('/movies'); // Redirige a la página de Movies
        } else {
          this.error = 'Credenciales incorrectas. Inténtalo nuevamente.';
        }
      } catch (error) {
        console.error('Error en el login:', error);
        this.error = 'Hubo un error al procesar la solicitud. Intenta nuevamente.';
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>
