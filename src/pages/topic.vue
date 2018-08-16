<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small">发布</el-button>
        <el-button type="info" size="small">保存草稿</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label-width="0">
        <el-col :span='12'>
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='4'>
          <el-form-item label-width="20px" prop="delivery" v-if="form.sort===1">
            <template>
              <el-radio v-model="form.delivery" label="1">单选</el-radio>
              <el-radio v-model="form.delivery" label="2">多选</el-radio>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span="6">
          <el-form-item label="产品">
            <el-select v-model="form.region" placeholder="请选择产品" class="full">
              <el-option label="产品1" value="shanghai"></el-option>
              <el-option label="产品2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            <el-select v-model="form.sort" placeholder="请选择类型" class="full">
              <el-option :label="item.name" :value="item.value" v-for="(item,index) in sortData" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span='6'>
          <el-form-item label="发布时间">
            <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期时间" class="full">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item v-if="form.sort===1">
        <el-form-item>
          <el-button type="info" size="small">添加选项</el-button>
        </el-form-item>
        <div class="space"></div>
        <el-col :span="18">
          <el-table :data="optionData" border :show-header="false">
            <el-table-column label="索引" align="center" type="index" width="150px"></el-table-column>
            <el-table-column label="内容" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.content" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
              <template slot-scope="scope">
                <el-button icon="el-icon-arrow-up"  circle size="small" title="上移"></el-button>
                <el-button icon="el-icon-arrow-down" circle size="small" title="下移"></el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-col :span="18">
            <Tinymce :height="600" ref="editor" v-model="content" />
          </el-col>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { upload } from '@/components'
export default {
  data () {
    return {
      sortData: [{
        name: '普通话题',
        value: 0
      }, {
        name: '投票',
        value: 1
      }],
      optionData: [{
        content: '题目1'
      }, {
        content: '题目2'
      }, {
        content: '题目3'
      }],
      content: `<p>我们都喜欢幻想，不管是幻想前往热带岛屿度假，还是在潜意识中谴责自己的老板。虽然你可能不会按照幻想去行动，但它们却可以帮你释放压力，甚至激励你在生活中做出积极的改变。性幻想也不例外，它甚至可以让你看透自己的性格。当然，性幻想的主要目的是让你兴奋起来，但是你想象中的性冒险也可以告诉你很多关于你如何看待自己以及周围世界的态度。</p>
      <p>为了更多地了解美国人的性幻想及其意义，金赛研究所(Kinsey Institute)的社会心理学家、研究员贾斯汀·莱米勒(Justin Lehmiller)对这个话题进行了规模最大、最全面的研究。他询问了4000多名年龄在18岁至87岁之间、涉及各种职业、性别、政治和宗教信仰的美国人有关性幻想的问题。</p>

      <div style="text-align: left;">莱米勒在新书《告诉我你想要什么：性欲科学及其如何帮助你改善性生活》(Tell Me What You Want： The Science of Sexual Desire, and How It Can Help You Improve Your Sex Life)中详述了这些结果。莱米勒想知道：在性爱方面，美国人真正想要什么？他们的欲望来自哪里？这些渴望揭示了什么？莱米勒表示：“人们觉得他们的性幻想很奇怪或不正常。这本书所做的一件大事就是，它将帮助人们认识到，他们并不是唯一拥有这些性幻想的人。”</div>
      <p></p>
      <p>莱米勒从全美50个州招募志愿者，主要通过社交媒体填写在线调查。通过分析，莱米勒得出以下结论：</p>
      <p>1）美国人最多的性幻想是三人性爱。89%的受访者承认自己曾幻想过三人性爱，其中男性更喜欢和两个女人一起玩3P，而女人则不太关心三人性爱参与者的性别。</p>
      <p>2）几乎每个人都曾幻想过群体性爱和BDSM(束缚、支配/服从、施虐受虐性爱)。在《五十度灰》的时代，这是不可避免的。65%的人幻想在他们的性体验中融入痛苦和支配因素，从束缚、打屁股到轻度窒息。在大多数情况下，人们承认主要的诱惑是放弃对他们伴侣的控制，不管他们的性行为如何。</p>
      <p>3）改变日常行为，塑造多样化。这应该是显而易见的，但是多样性是生活和性爱的调味品。即使你经常参加恋物游戏，太多的好东西也会导致卧室里的某种不适，而把它换掉是很重要的。显然，相当多的受访者承认，他们只是想要些与他们所习惯的任何标准性体验不同的东西。无论是新的场所、新的环境，还是新的角色，人们通常都希望性生活更加多样化。</p>
      <p>4）公共性爱幻想。许多最常见的性幻想包括在可能被抓住的地方发生性行为，比如公园、电梯或工作场所。当然，每个人都应该意识到，如果你选择在现实中这样做，你是在拿法律或工作冒险，所以要小心行事。</p>
      <p>5）非一夫一妻制幻想并不意味着欺骗你的伴侣。相反，它包括保持开放的性关系或者看着你的伴侣和其他人发生性关系。79%的女性对允许自己和伴侣与他人发生性行为感到好奇，并承认自己曾对此抱有幻想。</p>
      <p>6）研究发现，大多数人本质上渴望从性接触中得到的是被需要和被渴望的感觉。很多人都承认自己幻想过感情驱动的性行为，在这种性行为中，他们对自己的伴侣感到无法抗拒。</p>
      <p>7）59%的异性恋女性承认对与女性发生性爱心性幻想，26%的异性恋男性曾幻想与其他男性发生关系。</p>
      <p>莱米勒已经结婚7年，他在普渡大学获得了社会心理学博士学位，并在哈佛大学教授人类性行为学3年。美国心理协会(APA)称，这位“性与心理学”(Sex and Psychology)博客的作者“有点儿像男性Dear Abby，尽管他的博客建立在严谨的科学基础上。”《男性健康》杂志将他列为“性感尤物”之一。他还为《花花公子》杂志撰稿。</p>
     `,
      dialogVisible: false,
      form: {
        name: '',
        sort: 0,
        delivery: false
      }
    }
  },
  components: {
    upload,
    Tinymce
  },
  methods: {
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
