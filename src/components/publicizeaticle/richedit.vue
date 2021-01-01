<template>
  <div>
	<el-tiptap
	      v-model="content"
	      :extensions="extensions"
	></el-tiptap>
  </div>
</template>

<script>
import {
  // necessary extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
	// Iframe,
  CodeBlock,
  Blockquote,
  ListItem,
  BulletList, 
  OrderedList, 
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  TrailingNode,
  History,
  Table ,
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview,
  Print,
  Fullscreen,
  SelectAll,
  FontType,
  FontSize
} from 'element-tiptap';
import {uploadFileRequest} from '@/util/requestnetwork/uploadFileRequest'
import {ossfileupload} from '@/util/requestnetwork/OssFileUpload'

import {alibabafilerequestimp} from '@/util/requestnetwork/ossRequestFileToAli'
import {filegetprotiy} from '@/util/requestnetwork/ossRequestFileToAli'
export default {
  data () {
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
	  name:"richeditt"
      return {
        extensions: [
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new Link(),
          new Image({
						uploadRequest(file){
							const fd=new FormData();
							// //这里改成oss的
							let url="";
							 let policy={};
							 function getUUID () {
							   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
							     return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
							   })
							 }
							// const fd=new FormData();    //定义一个formdata用来存储文件，用于文件的上传
							
							
							// return uploadFileRequest(fd).then(res=>{
							// 	return res.data.data;
							// })
							// console.log("我是")
							// console.log(ossfileupload);
							// console.log("结果")
							// console.log(uploadFileRequest)
							// return 	ossfileupload().then(response=>{
							// 	console.log("过来了吗")
							// 	return response.data.data;
							// })
							
							 return 	ossfileupload().then(response=>{
							 		policy.policy = response.data.policy;
							 		policy.signature = response.data.signature;
							 		policy.ossaccessKeyId = response.data.accessid;
							 		policy.key = response.data.dir +getUUID()+'_${filename}';
							 		policy.dir = response.data.dir;
							 		policy.host = response.data.host;
							 		// _self.dataObj.policy = response.data.policy;
							 		// _self.dataObj.signature = response.data.signature;
							 		// _self.dataObj.ossaccessKeyId = response.data.accessid;
							 		// _self.dataObj.key = response.data.dir +this.getUUID()+'_${filename}';
							 		// _self.dataObj.dir = response.data.dir;
							 		// _self.dataObj.host = response.data.host;
							 		fd.append("policy",policy.policy);
							 		fd.append("signature",policy.signature);
						 		fd.append("key",policy.key);
							 		fd.append("ossaccessKeyId",policy.ossaccessKeyId);
							 		fd.append("dir",policy.dir);
							 		fd.append("host",policy.host);
							 		fd.append("file",file);
							 	  alibabafilerequestimp(fd).then(res=>{
							 		})
							 		url=policy.host + '/' + policy.key.replace("${filename}",file.name);
							 		let urltemp=url;
							 		return urltemp;
							 	})
						 // 	return alibabafilerequestimp(fd).then(res=>{
						 // 	console.log("我过劳了")
						 // 	return "https://www.baidu.com/img/flexible/logo/pc/result.png";
						 // })
						
							// return new Promise((resolvt,reject)=>{
							// 	ossfileupload().then(response=>{
							// 		policy.policy = response.data.policy;
							// 		policy.signature = response.data.signature;
							// 		policy.ossaccessKeyId = response.data.accessid;
							// 		policy.key = response.data.dir +getUUID()+'_${filename}';
							// 		policy.dir = response.data.dir;
							// 		policy.host = response.data.host;
							// 		fd.append("policy",policy.policy);
							// 		fd.append("key",policy.key);
							// 		fd.append("signature",policy.signature);
							// 		fd.append("dir",policy.dir);
							// 		fd.append("host",policy.host);
							// 		fd.append("ossaccessKeyId",policy.ossaccessKeyId);
							// 		fd.append("file",file);
							// 		console.log(policy)
							// 	})
							// }).then(res=>{
							// 	console.log("调用了了")
							// return url;
							// })
						 // 	ossfileupload().then(response=>{
							// 				let url="";
							// 			  
							// 			  alibabafilerequestimp(fd).then(res=>{
							// 				url=policy.host + '/' + policy.key.replace("${filename}",file.name);
							// 			}).then(res=>{
							// 				
							// 			})
							// 	return url;		
							//  })
						}
					}),
					// new Iframe(),
          new CodeBlock(),
          new Blockquote(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new TextAlign(),
          new Indent(),
          new LineHeight(),
          new HorizontalRule(),
          new HardBreak(),
          new TrailingNode(),
          new History(),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new FormatClear(),
          new TextColor(),
          new TextHighlight(),
          new Preview(),
          new Print(),
          new Fullscreen(),
          new SelectAll(),
          new FontType(),
          new FontSize()
        ],
        // 编辑器的内容
        content: `
          <h1>开始吧</h1>
        `,
		lang:""
      };
    },
  components:{
	 'el-tiptap': ElementTiptap,
  },
	watch:{
		content:function(){
				this.$emit("richdietcontenchange",this.content)
			}
		},
		methods:{
			getUUID () {
			  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
			  })
			}
		}
	
}
</script>
<style>
	
</style>