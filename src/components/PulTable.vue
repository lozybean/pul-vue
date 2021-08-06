<template>
  <el-container direction="vertical">
    <el-table
      :data="tableData"
      @sort-change="sortChange"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column sortable="custom" prop="pul_type" label="PUL Type">
      </el-table-column>
      <el-table-column sortable="custom" prop="id" label="PUL ID">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="assembly_accession"
        label="GCF Number"
        min-width="110"
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="species"
        label="Organism Name"
        min-width="100"
      >
      </el-table-column>
      <el-table-column sortable="custom" prop="phylum" label="Phylum">
      </el-table-column>
      <el-table-column prop="action" label="Action">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="goToPulDetails(scope.$index, tableData)"
            type="text"
            size="small"
          >
            View
          </el-button>
          &nbsp;&nbsp;
          <el-dropdown>
            <el-button type="text" size="small" class="el-dropdown-link">
              Download
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button
                  @click.native.prevent="dlDna(scope.$index, tableData)"
                  type="text"
                  size="small"
                >
                  DNA
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  @click.native.prevent="dlProtein(scope.$index, tableData)"
                  type="text"
                  size="small"
                >
                  Protein
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  @click.native.prevent="dlGenbank(scope.$index, tableData)"
                  type="text"
                  size="small"
                >
                  Genbank
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model="page_no"
      :total="total"
      @current-change="getTableData"
      layout="prev, pager, next"
      style="margin-top: 10px"
    >
    </el-pagination>
  </el-container>
</template>

<script>
export default {
  name: "PulTable",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    getData: {
      type: Function,
      default: () => Promise.resolve([]),
    },
  },
  data() {
    return {
      loading: false,
      tableData: [],
      page_no: 1,
      page_len: 10,
      total: 0,
      sort_col: "",
      sort_order: "",
    };
  },
  methods: {
    async getTableData(page_idx, column_prop, column_order) {
      this.loading = true;
      let page_no = page_idx || this.page_no;
      let sort_col = column_prop || this.sort_col;
      let sort_order = column_order || this.sort_order;
      try {
        let resp = await this.getData(
          page_no,
          this.page_len,
          sort_col,
          sort_order
        );
        this.tableData = resp["data"]["list"];
        this.total = resp["data"]["total"];
      } finally {
        this.loading = false;
      }
    },
    goToPulDetails: function (scope_index, tableData) {
      let pul_id = tableData[scope_index]["id"];
      //this.$router.push({ name: 'pul', params: { pul_id }});
      let routeData = this.$router.resolve({ name: "pul", params: { pul_id } });
      console.log(routeData.href);
      window.open(routeData.href, "_blank");
    },
    dlData: function (scope_index, tableData, suffix) {
      let row_data = tableData[scope_index];
      let id = row_data.id;
      let pul_type = row_data.pul_type;
      let href;
      if (suffix == "genbank") {
        href = `/static/media/release/genbank/${pul_type}/${id}.genbank`;
      } else {
        href = `/static/media/release/${suffix}/${pul_type}/${id}_${suffix}.fasta`;
      }
      window.open(href, "_blank");
    },
    dlDna: function (scope_index, tableData) {
      this.dlData(scope_index, tableData, "DNA");
    },
    dlProtein: function (scope_index, tableData) {
      this.dlData(scope_index, tableData, "protein");
    },
    dlGenbank: function (scope_index, tableData) {
      this.dlData(scope_index, tableData, "genbank");
    },
    sortChange: function (column) {
      //console.log(column+'-'+column.prop+'-'+column.order);
      this.sort_col = column.prop;
      this.sort_order = column.order;
      this.getTableData();
    },
  },
  created() {
    console.log("> PUL table created");
    this.getTableData();
  },
};
</script>
