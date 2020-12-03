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
							fd.append("img",file);
							return uploadFileRequest(fd).then(res=>{
								return res.data.data;
							})
						}
					}),
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
		}
	
}
</script>
<style>
	
</style>