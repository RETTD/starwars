<template>
  <v-container>
    <v-col cols="12">
      <v-img
        src="https://wallpaperaccess.com/full/496936.jpg"
        contain
        height="250"
      ></v-img>
    </v-col>
    <v-col>
<v-list>
          <v-list-item-group>
            <v-list-item>
              Imię: &nbsp; <b>{{ person.name }}</b>
            </v-list-item>
            <v-list-item>
              Data urodzenia:&nbsp; <b>{{ person.birth_year }} </b></v-list-item
            >
            <v-list-item>
              Płeć:&nbsp; <b>{{ person.gender }}</b>
            </v-list-item>
            <v-list-item>
              Planeta:&nbsp; <b>{{ planet }}</b>
            </v-list-item>
            <v-list-item>
              Wzrost:&nbsp; <b>{{ person.height }}</b>
            </v-list-item>

            <v-list-item>
              Waga:&nbsp; <b>{{ person.mass }}</b>
            </v-list-item>
            <v-list-item>
              Kolor skóry:&nbsp; <b>{{ person.skin_color }}</b>
            </v-list-item>
            <v-list-item>
              Kolor włosów:&nbsp; <b>{{ person.hair_color }}</b>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      <v-btn text @click="goBack">Wstecz</v-btn>
    </v-col>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "person",
  data() {
    return {
      person: {},
      planet: {},
      homeworld: {},
    };
  },
  mounted() {
    const url = this.$route.params.url;
    axios.get(url).then((data) => {
      return (this.person = data.data), this.getHomeWorld();
    });
  },
  methods: {
    getHomeWorld() {
      axios.get(this.person.homeworld).then((data) => {
        return (this.planet = data.data.name);
      });
    },
    goBack(){
      this.$router.go(-1)
    }
  },
};
</script>
