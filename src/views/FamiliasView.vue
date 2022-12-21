<template>
  <div class="flex flex-col mt-16">
    <div class="overflow-x-auto">
      <div class="flex justify-between py-3 pl-2">
        <h1 class="text-2xl font-bold">Familias</h1>
      </div>
      <div class="p-1.5 w-full inline-block align-middle">
        <div class="overflow-hidden border rounded-lg">
          <table class="hover:table-fixed min-w-full divide-y divide-gray-200">
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
                  Ficha Familiar
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Familia
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Direccion
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
                  N° integrantes
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
              <tr v-for="familia in displayedFamilias" :key="familia.id">
                <!-- <td
                  class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  {{ familia.id }}
                </td> -->
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ familia.ficha_familiar }}
                </td>
                <td
                  class="px-6 py-4 text-sm uppercase text-gray-800 whitespace-nowrap"
                >
                  {{ familia.familia }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ familia.domicilio }}
                </td>
                <td v-if="familia.sector == 'SB'">
                  {{ familia.sector }}
                  <a class="text-orange-500 hover:text-orange-700">
                    <span>
                      <font-awesome-icon
                        :icon="['fas', 'square']"
                        class="icon alt"
                      />
                    </span>
                  </a>
                </td>
                <td v-else-if="familia.sector == 'SA'">
                  {{ familia.sector }}
                  <a class="text-blue-500 hover:text-blue-700">
                    <span>
                      <font-awesome-icon
                        :icon="['fas', 'square']"
                        class="icon alt"
                      />
                    </span>
                  </a>
                </td>
                <td v-else>
                  {{ familia.sector }}
                  <a class="text-white-500 hover:text-white-700">
                    <span>
                      <font-awesome-icon
                        :icon="['fas', 'square']"
                        class="icon alt"
                      />
                    </span>
                  </a>
                </td>
                <td
                  class="px-6 py-4 text-sm text-gray-800 text-center whitespace-nowrap"
                >
                  {{ familia.num_integrantes }}
                  <span>
                    <font-awesome-icon
                      :icon="['fas', 'users']"
                      class="mr-1 align-rigth"
                    />
                  </span>
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
                  :to="{ name: 'Familias', query: { page: previousPage } }"
                  class="mx-3 text-sm font-semibold text-brand-blue-1"
                >
                  Anterior
                </router-link>
                <router-link
                  v-if="nextPage"
                  :to="{ name: 'Familias', query: { page: nextPage } }"
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
  name: "FamiliasView",
  data() {
    return {
      familias: [],
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
      const maxPage = this.familias.length / 10; // 100/ 10 = 10
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedFamilias() {
      const pageNumber = this.currentPage;
      const firstPatIndex = (pageNumber - 1) * 10; // 1 -1 = 0 * 10 = 0
      const lastPatIndex = pageNumber * 10;
      return this.familias.slice(firstPatIndex, lastPatIndex);
    },
  },
  async mounted() {
    const response = await axios.get(
      //"https://sfamiliar-api.test/api/v1/familias"
      "https://sfamiliar-api.up.railway.app/api/v1/familias"
    );
    this.familias = response.data.data;
    console.log(this.familias, "familias");
  },
};
</script>
