<template>
  <Layout>
    <template #main>
      <div class="tag-main">
        <div class="tag-box">
          <span class="top-tag"
                :class="[currentTag == tag.tag ? 'active' : '', `b0${getRandomNumber(4)}`, `co0${getRandomNumber(7)}`]"
                v-for="(tag, index) in tags"
                @click="handleTag(tag.tag)">
            #{{ tag.tag }} <b class="count">{{ tag.posts.length }}</b>
          </span>
        </div>
        <div>
          <div class="article-container">
            <template v-for="tag in tags">
              <div v-show="tag.tag == currentTag || currentTag == ''">
                <!-- <span class="tag-above">#{{ tag.tag }}</span> -->
                <div class="article--tag-box">
                  <div class="article-wrapper"
                       v-for="post in tag.posts"
                       :style="{ background: `url(${post.frontmatter.cover})`,boxShadow: `0 0 20px #${post.frontmatter.primary}20`,}">
                    <div class="tag-article">
                      <h1 class="tag-h1">
                        <a :href="`${post.link}.html`">{{post.frontmatter.title}}</a>
                      </h1>
                      <div class="mid">
                        <div class="mid-l">
                          <p>{{ post.frontmatter.summary }}</p>
                          <div class="tags-box">
                            <span class="tag"
                                  v-for="tag in post.frontmatter.tag">
                              {{ tag }}
                            </span>
                          </div>
                        </div>
                        <a :href="`${post.link}.html`">
                          <img class="mid-r"
                               :src="post.frontmatter.cover"
                               alt="cover" />
                        </a>
                      </div>
                      <div class="bottom">
                        <span>{{ post.frontmatter.words }}/{{post.frontmatter.readTime}}·</span>
                        <span class="date">{{ post.frontmatter.date }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>
<script setup>
import Layout from "./Layout.vue";
// import { tagcloud } from "../utils/tagcloud.js";
import { ref, onMounted } from "vue";
const tags = __POSTS__.tags;
let currentTag = ref("");

let max = Math.max(...tags.map((v) => v.posts.length));
currentTag.value = tags.filter((v) => v.posts.length == max)[0].tag;
const handleTag = (tag) => {
  tag == currentTag.value ? (currentTag.value = "") : (currentTag.value = tag);
};
const getRandomNumber = (range) => {
  return (Math.floor(Math.random() * 10) % range) + 1;
};
onMounted(() => {
  import("../utils/tagcloud.js").then(({tagcloud}) => {
    tagcloud = tagcloud(window, document);
    tagcloud({
      selector: ".tag-box", //元素选择器
      fontsize: 16, //基本字体大小, 单位px
      radius: 100, //滚动半径, 单位px
      mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
      ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
      direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
      keep: false, //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
    });
  });
});
</script>
<style lang="scss">
@import url(../styles/pages/tagcloud.css);
.tag-main {
  padding-top: 100px;
  max-width: 950px;
  margin: auto;
  overflow: hidden;
}
.article-container {
  padding-top: 2em;
}
.tag-above {
  padding: 0.5em;
}
.top-tag {
  //   background: var(--tag-card-bg);
  margin: 0.5em;
  //   border-radius: 6px;
  white-space: nowrap;
  display: inline-block;
  position: relative;
  display: inline-flex;
  //   padding-left: 1em;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 10px var(--tag-card-bg);
  font-size: 18px;
  font-family: "Josefin Sans";
  &.active {
    color: var(--c-brand);
  }
  &:hover {
    color: var(--c-brand);
  }
  .count {
    // height: 100%;
    // display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.5em;
    font-size: 12px;
  }
}
.article--tag-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  width: 100%;
  .article-wrapper {
    width: 300px;
    border-radius: 6px;
    overflow: hidden;
    margin: 0.5em;
  }
  &::after {
    content: "";
    flex: 1;
    @media screen and (max-width: 600px) {
      flex: 0;
    }
  }
  .tag-article {
    background: var(--tag-card-bg);
    padding: 1em;
    backdrop-filter: blur(20px);
    .tag-h1 {
      font-size: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        color: currentColor;
      }
    }
    .mid {
      display: flex;
      .mid-l {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          margin: 0;
          padding: 0;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .tag {
          font-size: 12px;
          border-radius: 6px;
          padding: 0 0.5em;
          margin-right: 1em;
          margin-bottom: 1em;
          background: var(--c-bg);
        }
      }
      .mid-r {
        width: 90px;
        height: 90px;
        object-fit: cover;
        border-radius: 6px;
        overflow: hidden;
        margin-left: 1em;
      }
    }
    .bottom {
      padding-top: 1em;
      font-size: 12px;
      /* font-family: 'Times New Roman', Times, serif; */
    }
  }
}
</style>
