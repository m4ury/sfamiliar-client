<template>
  <div class="flex flex-col mt-16">
    <div class="overflow-x-auto">
      <div class="flex justify-between py-3 pl-2">
        <h1 class="text-2xl font-bold">Pacientes</h1>
      </div>
      <div class="p-1.5 w-full inline-block align-middle">
        <div class="overflow-hidden border rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <!-- <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  ID
                </th> -->
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Nombres
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Rut
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Edad
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Ficha
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Sector
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="patient in displayedPacientes" :key="patient.id">
                <!-- <td
                  class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  {{ patient.id }}
                </td> -->
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ patient.nombres }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ patient.rut }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ patient.edad }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ patient.ficha ?? "Sin ficha" }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ patient.sector }}
                </td>
                <td
                  class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                >
                  <a class="text-green-500 hover:text-green-700" href="#">
                    <span>
                      <font-awesome-icon
                        :icon="['fas', 'edit']"
                        class="mr-0.5"
                      />
                    </span>
                  </a>
                </td>
                <td
                  class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                >
                  <a class="text-red-500 hover:text-red-700" href="#">
                    <span>
                      <font-awesome-icon
                        :icon="['fas', 'trash-alt']"
                        class="mr-0.5"
                      />
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-8 mx-auto">
            <div class="flex flex-row flex-nowrap">
              <p class="text-sm flex-grow">Página {{ currentPage }}</p>
              <div class="flex items-center justify-center">
                <router-link
                  v-if="previousPage"
                  :to="{ name: 'Patients', query: { page: previousPage } }"
                  class="mx-3 text-sm font-semibold text-brand-blue-1"
                >
                  Anterior
                </router-link>
                <router-link
                  v-if="nextPage"
                  :to="{ name: 'Patients', query: { page: nextPage } }"
                  class="mx-3 text-sm font-semibold text-brand-blue-1"
                >
                  Siguiente
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  computed: {
    currentPage() {
      const pageString = this.$route.query.page || "1";
      console.log(pageString);
      return Number.parseInt(pageString);
    },
    previousPage() {
      const previousPage = this.currentPage - 1; // 1 - 1 = 0  - || 2 - 1 = 1
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = this.patients.length / 10; // 100/ 10 = 10
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedPacientes() {
      const pageNumber = this.currentPage;
      const firstPatIndex = (pageNumber - 1) * 10; // 1 -1 = 0 * 10 = 0
      const lastPatIndex = pageNumber * 10;
      return this.patients.slice(firstPatIndex, lastPatIndex);
    },
  },
  async mounted() {
    const response = await axios.get(
      "https://sfamiliar-api.test/api/v1/pacientes"
      //"https://sfamiliar-api.up.railway.app/api/v1/pacientes"
    );
    this.patients = response.data.data;
    console.log(this.patients, "patients");
  },
};
</script>
