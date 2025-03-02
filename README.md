# 尘世百味 WorldTaste

![8e1344c148965aa9c5999a1b3a705d07](https://github.com/user-attachments/assets/0ada326a-eb54-40b1-855c-0f4160e76cce)

尘世百味RykenSlimefunCustomizer插件写成的一份配置文件，旨在向粘液科技中加入上百种来自世界各地的美食(共计500+食物)

安装尘世百味需要使用RykenSlimefunCustomizer，简称rsc，在此[下载RykenSlimefunCustomizer](https://builds.guizhanss.com/SlimefunReloadingProject/RykenSlimeCustomizer/main)


![当前版本](https://img.shields.io/github/v/release/haiman233/WorldTaste?include_prereleases)
![下载数](https://img.shields.io/github/downloads/haiman233/WorldTaste/total)

## 公告

1、十分感谢[balugaq](https://github.com/balugaq)编写的[rsc-editor](https://github.com/balugaq/RSCEditor)，大大加快了尘世百味的推出进程

感谢balugaq和Eventually在脚本编写上给予的帮助

2、安装尘世百味，只需要将下载的文件解压，然后直接拖入server\plugins\RykenSlimefunCustomizer\addons目录下即可

3、尘世百味1.1版本及以上需要服务器安装异域花园附属

## 前置插件需求
前置：
- Slimefun
- GuizhanLibPlugin
- Gastronomicon（美食家）
- ExoticGarden（异域花园）(尘世百味1.1版本及以上)

软前置：
- Cultivation（农耕工艺）

## 游戏内展示

![15abc0ff-48b0-46e3-aa37-3d5a7c432194](https://github.com/user-attachments/assets/2cb7faab-2aee-4f3b-b469-4c156441aefe)

# 致开发者

如果你想要向尘世百味中添加自己的食物，需要先详细阅读[rsc wiki](https://rsc.hiworldmc.com/)，了解基础的编写流程

需要额外注意的是，如果在items文件里使用了自定义的多方块机器，需要在mb_machines文件里找到相应的多方块机器，并将配方额外的列一份在多方块的recipes里

尘世百味自带了制作食物所需的js脚本文件，使用相应脚本文件只需将文件名输入在items文件的 **script: ** 之后

脚本中，只含数字的脚本，对应着食物恢复的饥饿值和饱和度，“yan”代表这是香烟使用的脚本，“tang”代表这是汤使用的脚本，还有一些其它脚本，可以自行体验一番

如果你也想为这个附属做一些贡献，欢迎提pr



