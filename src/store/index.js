import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  user:JSON.parse(window.localStorage.getItem("remebermeadmin"))||{},
	  blogdetail:"aa"
  },
  mutations: {
	  saveUser(state,adminuser){
		  state.user=adminuser;
	  },
	  deleteUser(state){
		 state.user={}
	  },
	  saveblogdetail(state,blogdetail){
		  state.blogdetail=blogdetail;
	  },
	  deletesaveblogdetail(state){
		  state.blogdetail="";
	  }
  },
  actions: {
	  saveUser(content,user){
		  content.commit("saveUser",user)
	  },
	  deleteUser(content){
		  content.commit("deleteUser")
	  },
	  saveblogdetail(content,blogdetail){
		  content.commit("saveblogdetail",blogdetail);
	  },
	  deletesaveblogdetail(content){
		  content.commit("deletesaveblogdetail")
	  }
  },
  modules: {
  }
})
