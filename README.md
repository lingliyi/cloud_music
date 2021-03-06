# 高仿网易云音乐

##### 1.**项目简介**

本项目后端接口是 Binaryify 的开源项目（项目地址：[https://github.com/Binaryify/NeteaseCloudMusicApi](http:)），接口文档直接在百度搜索“网易云音乐 API”作者是 Binaryify。

本项目前端均是本人独立自主开发，所用技术栈：Vue 全家桶+Element-UI+axios。

后端 API 官方文档：[<https://binaryify.github.io/NeteaseCloudMusicApi/#/>](http:)



### [项目预览](http://www.lingliyi.icu/#/found)



##### 2.遇到的问题：

1.如何触发音乐播放器，传数据给播放器组件。

bus，本项目采用的就是 bus。使用\$bus 这样不论音乐播放器和要播放的音乐所在组件是何种关系，都可以监听到要播放的音乐

2.如何手写一个 audio 组件

这里参考的是<https://segmentfault.com/a/1190000012453975>这篇文章，收获良多

3.路由传参跳转界面没有刷新

解决办法：

`<router-view :key="$route.fullPath"></router-view>`

##### 3.效果图

![1598867577933](https://github.com/lingliyi/images/blob/master/cloud_images/1598867577933.png)

![1598867607989](https://github.com/lingliyi/images/blob/master/cloud_images/1598867607989.png)

![1598867642292](https://github.com/lingliyi/images/blob/master/cloud_images/1598867642292.png)

![1598867677840](https://github.com/lingliyi/images/blob/master/cloud_images/1598867677840.png)

![1598867878044](https://github.com/lingliyi/images/blob/master/cloud_images/1598867878044.png)

![1598872923053](https://github.com/lingliyi/images/blob/master/cloud_images/1598872923053.png)
