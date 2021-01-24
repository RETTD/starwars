<template>
  <v-container>
    <v-row class="row">
      <v-col cols="12">
        <v-img
          src="https://wallpaperaccess.com/full/496936.jpg"
          contain
          height="250"
        ></v-img>
        <div>Wyszukiwarka postaci STAR WARS</div></v-col
      >

      <v-col>
        <v-text-field label="Wpisz imię postaci" v-model="name"></v-text-field>
        <v-btn
          style="background-color: lightblue"
          text
          class="mx-0 mt-3"
          @click="getName"
          >Szukaj</v-btn
        >
      </v-col>
      <v-col>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="people in people"
              :key="people"
              @click="getDataOfPerson(people)"
            >
              <v-list-item-content>{{ people.name }} </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col>
        <v-btn text @click="getPreviousData">Poprzednia</v-btn>
        <v-btn text @click="getNextData">Następna</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { swapiModule } from "../api/swapi";
// import VueRouter from 'vue-router'
export default {
  name: "myStore",
  data() {
    return {
      msg: "Welcome on STAR WARS API",
      name: "",
      people: {},
      nextPage: {},
      previousPage: {},
    };
  },
  mounted() {
    swapiModule.getPeople({}, (data) => {
      console.log("All results that match", data);
      return (
        (this.people = data.results),
        (this.nextPage = data.next),
        (this.previousPage = data.previous)
      );
    });
  },
  methods: {
    getName() {
      swapiModule.getPeople({ search: this.name }, (data) => {
        return (
          (this.people = data.results),
          (this.nextPage = data.next),
          (this.previousPage = data.previous)
        );
      });
    },
    getNextData() {
      axios.get(this.nextPage).then((data) => {
        console.log("next", data);

        return (
          (this.people = data.data.results),
          (this.nextPage = data.data.next),
          (this.previousPage = data.data.previous)
        );
      });
    },
    getPreviousData() {
      axios.get(this.previousPage).then((data) => {
        console.log("previous", data);
        return (
          (this.people = data.data.results),
          (this.previousPage = data.data.previous),
          (this.nextPage = data.data.next)
        );
      });
    },
    getDataOfPerson(people) {
      console.log("URL", people.url);
      this.$router.push({ name: "Person", params: { url: people.url } });
    },
  },
};
</script>
<style>
.row {
  display: flex;
  flex-direction: column;
}
</style>
