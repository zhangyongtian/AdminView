import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  user:JSON.parse(window.localStorage.getItem("remebermeadmin"))||{}
  },
  mutations: {
	  saveUser(state,adminuser){
		  state.user=adminuser;
	  },
	  deleteUser(state){
		 state.user={}
	  }
  },
  actions: {
	  saveUser(content,user){
		  content.commit("saveUser",user)
	  },
	  deleteUser(content){
		  content.commit("deleteUser")
	  }
  },
  modules: {
  }
})
