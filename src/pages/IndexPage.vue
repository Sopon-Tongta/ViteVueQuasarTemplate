<template>
  <div class="flex justify-center my-3 text-4xl font-prompt-bold text-theme-color">Login</div>
  <div class="flex justify-center items-center mb-5">
    <div class="grid grid-cols-3 gap-2">
      <div class="row-span-2 flex justify-end">
        <q-icon name="person" size="90px" color="theme-color" />
      </div>
      <div><q-input dense outlined v-model="loginUser" placeholder="Username" /></div>
      <div>
        <q-btn unelevated color="theme-color" label="เข้าสู่ระบบ" no-caps @click="onLoginClick" />
      </div>
      <div>
        <q-input dense outlined v-model="loginPassword" type="password" placeholder="Password" />
      </div>
    </div>
  </div>
  <div class="mx-8">
    <q-table
      flat
      dense
      bordered
      hide-pagination
      table-class="workflow-table"
      row-key="workflowId"
      :loading="loading"
      :rows="rows"
      :columns="columns"
      :pagination="pagination"
    >
      <template v-slot:loading>
        <q-inner-loading showing>
          <q-spinner-hourglass size="40px" color="theme-color" />
        </q-inner-loading>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div>{{ col.value }}</div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom>
        <span v-if="rows.length > 0" class="pagination-banner">
          {{ itemFirstPage }}-{{ itemFinalPage }} of {{ itemCount }}
        </span>
        <q-space />
        <q-pagination
          v-model="pagination.page"
          color="theme-color"
          :max="pageMax"
          :max-pages="6"
          direction-links
          boundary-links
          size="12px"
          @update:model-value="searchData"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import useWorkflowHook from "../hooks/useWorkflow";
export default defineComponent({
  name: "index",
  emits: ["onRedirect"],
  setup(props, ctx) {
    const { workflowList, workflowTotal, getWorkflow } = useWorkflowHook.useWorkflow();
    const itemCount = ref(workflowTotal);
    const itemFirstPage = ref(0);
    const itemFinalPage = ref(0);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 20,
    });

    const createColumns = [
      {
        name: "workflowId",
        label: "ลำดับงาน",
        align: "left",
        field: "workflowId",
      },
      {
        name: "createDate",
        label: "วันที่ขอรับบริการ",
        align: "left",
        field: "createDate",
      },
      {
        name: "requireDate",
        label: "วันที่ต้องการ",
        align: "left",
        field: "requireDate",
      },
      {
        name: "workflowName",
        label: "เรื่อง",
        align: "left",
        field: "workflowName",
      },
      {
        name: "status",
        label: "สภานะปัจจุบัน",
        align: "left",
        field: "status",
        style: (row) => {
          let css = "";
          switch (row.status.toLowerCase()) {
            case "เสร็จสิ้น":
              css = "color: #1269bf;";
              break;
            case "รอตรวจงาน":
              css = "color: #6e07d4;";
              break;
          }
          return css + "font-weight: bold;";
        },
      },
      {
        name: "modifyBy",
        label: "ผู้ปฎิบัติงาน",
        align: "left",
        field: "modifyBy",
      },
    ];

    const calculatePageging = () => {
      let page = pagination.value.page;
      let pageSize = pagination.value.rowsPerPage;
      let finalPage = page * pageSize;
      let firstPage = finalPage - (pageSize - 1);
      finalPage = finalPage > itemCount.value ? itemCount.value : finalPage;
      itemFinalPage.value = finalPage;
      itemFirstPage.value = firstPage;
    };

    const pageMax = computed(() => Math.ceil(itemCount.value / pagination.value.rowsPerPage));

    const loading = ref(false);

    const searchData = async () => {
      loading.value = true;
      await getWorkflow().then(() => {
        loading.value = false;
        calculatePageging();
      });
    };

    onMounted(() => {
      searchData();
    });

    const loginUser = ref("");
    const loginPassword = ref("");
    const onLoginClick = () => {
      ctx.emit("onRedirect", "serviceReceiver");
    };

    return {
      columns: createColumns,
      rows: workflowList,
      pageMax,
      pagination,
      itemFirstPage,
      itemFinalPage,
      itemCount,
      loading,
      searchData,
      loginUser,
      loginPassword,
      onLoginClick,
    };
  },
});
</script>
<style lang="scss">
.workflow-table {
  height: calc(100vh - 300px);
}
</style>
