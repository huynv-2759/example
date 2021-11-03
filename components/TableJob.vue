<template>
  <v-simple-table fixed-header height="600px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Ngày</th>
          <th class="text-left">Tiêu đề</th>
          <th class="text-left">Mô tả</th>
          <th class="text-left">Kết quả</th>
          <th class="text-left">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job2 in listJobs" :key="job2.id">
          <td>{{ job2.date }}</td>
          <td>{{ job2.title }}</td>
          <td>{{ job2.description }}</td>
          <td>{{ job2.result }}</td>
          <td>
            <b-button @click.stop="setModal(job2)" v-b-modal.modal-prevent-update style="background: #fac25c">Sửa</b-button>
            <b-button @click="deleteJob(job2.id)" style="background: red">Xóa</b-button>
            <nuxt-link :to="{name: 'todo-id', params: { id:job2.id} }">Chi tiết</nuxt-link>
          </td>
        </tr>
      </tbody>
      <b-modal
        id="modal-prevent-update"
        ref="modal"
        title="Sửa công việc"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmitUpdate">
          <b-form-group
            label="Ngày"
            label-for="date-input"
            invalid-feedback="Bạn chưa chọn ngày"
            :state="job3.dateState"
          >
            <b-form-input
              type="date"
              id="date-input"
              v-model="job3.date"
              :state="job3.dateState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Tiêu đề"
            label-for="title-input"
            invalid-feedback="Bạn chưa nhập tiêu đề"
            :state="job3.titleState"
          >
            <b-form-input
              id="title-input"
              v-model="job3.title"
              :state="job3.titleState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Mô tả"
            label-for="description-input"
            invalid-feedback="Bạn chưa nhập mô tả"
            :state="job3.descriptionState"
          >
            <b-form-input
              id="description-input"
              v-model="job3.description"
              :state="job3.descriptionState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Kết quả"
            label-for="result-input"
          >
            <b-form-input
              id="result-input"
              v-model="job3.result"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    listJobs: []
 },
 data() {
      return {
        job3: {
          id: '',
          title: '',
          description: '',
          date: '',
          result: '',
          titleState: null,
          descriptionState: null,
          dateState: null
        },
        job_id: ''
      }
    },
    methods:{
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.job3.titleState = valid
        this.job3.descriptionState = valid
        this.job3.dateState = valid
        return valid
      },
      resetModal() {
        this.job3.id = ''
        this.job3.title = ''
        this.job3.description = ''
        this.job3.date = ''
        this.job3.result = ''
        this.job3.nameState = null
      },
      setModal(job2) {
        this.job3.id = job2.id
        this.job3.title = job2.title
        this.job3.description = job2.description
        this.job3.date = job2.date
        this.job3.result = job2.result
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        try {
         this.error = null
         const response = await axios.put('http://127.0.0.1:8000/api/job/update-job/' + this.job3.id, {
           title: this.job3.title,
           description: this.job3.description,
           date: this.job3.date,
           result: this.job3.result
         }, {
             headers: {'Authorization': this.$auth.getToken('local')}
        })
         console.log(response.data)
        } catch (error) {
            this.error = error
        }
        location.reload()
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-update')
        })
      },
      deleteJob(id) {
        this.job_id = id
        this.$bvModal.msgBoxConfirm('Bạn có chắc chắn muốn xóa công việc này.', {
          title: 'Vui lòng xác nhận',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value === true){
              try {
                this.error = null
                const response = axios.delete('http://127.0.0.1:8000/api/job/delete-job/' + this.job_id, {
                      headers: {'Authorization': this.$auth.getToken('local')}
                })
                console.log(response.data)
                location.reload()
                } catch (error) {
                    this.error = error
                }
              }
            })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
}
</script>
<style>
.text-left {
  text-align:left
}
</style>
