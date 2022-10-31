<template>
  <v-simple-table fixed-header height="600px" class="responsive">
    <template v-slot:default>
      <h2> Chi tiết công việc </h2>
      <nuxt-link :to="{name: 'todo'}">Trở về</nuxt-link>
      <thead>
      </thead>
      <tbody>
        <tr>
          <td>Ngày thực hiện</td>
          <td>{{ job.date }}</td>
        </tr>
        <tr>
          <td>Tiêu đề</td>
          <td>{{ job.title }}</td>
        </tr>
        <tr>
          <td>Mô tả</td>
          <td>{{ job.description }}</td>
        </tr>
        <tr>
          <td>Kết quả</td>
          <td>{{ job.result }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import axios from 'axios'
export default {
  async asyncData ({ params }) {
      const { data } = await axios.get('http://127.0.0.1:8000/api/job/job-detail/' + params.id)
      return{
        job: data.data
      }
  },
}
</script>
<style>
  .responsive{
    width: 500px
  }
</style>
