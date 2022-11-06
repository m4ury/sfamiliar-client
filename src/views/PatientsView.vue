<template>
  <div class="mt-16">
    <h1 class="text-6xl font-bold">Pacientes view</h1>
    <table class="table-fixed">
      <thead>
        <tr>
          <th>Song</th>
          <th>Artist</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
        </tr>
        <tr>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "PatientsView",
  data() {
    return {
      patients: [],
    };
  },
  async mounted() {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/pacientes/");
    this.patients = response.data;
    console.log(this.patients);
  },
};
</script>
