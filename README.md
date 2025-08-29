# 尘世百味 WorldTaste

<img width="580" height="580" alt="worldtaste" src="https://github.com/user-attachments/assets/89593566-830a-466a-b8f2-6cd2b2459d0b" />

尘世百味是用RykenSlimefunCustomizer插件写成的一份配置文件，旨在向粘液科技中加入上千种来自世界各地的美食（绝对是上千种）

尘世百味添加了多种作物，包含各类变种作物，向游戏中添加了钓鱼系统，可以用鱼饵钓上各式各样的鱼类。添加了屠宰系统，为所有生物添加了对应的肉，屠宰获得的食材可用于烹饪

尘世百味分类涵盖了所有烹饪需求，添加的美食包含发酵食品，香烟，烘焙，快餐，肉食，中餐，汤与炖菜，冰激凌与糖，日料，甜品，零食，饮品(包含酿酒/果汁)，果切，怪味餐和功能丸子。

如果你是建筑党，想装饰你的厨房，尘世百味还添加了各式各样的厨房装饰

除此之外，尘世百味在分类的第二页还添加了主题餐饮，目前已添加愚人节和无尽贪婪两种主题餐饮(后续会更新)

# 如何安装

1、安装尘世百味需要服务器安装RykenSlimefunCustomizer，简称rsc，在此[下载RykenSlimefunCustomizer](https://builds.guizhanss.com/SlimefunReloadingProject/RykenSlimeCustomizer/main)

2、将下载好的rsc拖入plugins文件，重启服务器，让rsc生成RykenSlimefunCustomizer文件夹

3、[点此下载尘世百味](https://github.com/haiman233/WorldTaste/releases) ，并将下载的文件解压，将整个文件夹拖入server\plugins\RykenSlimefunCustomizer\addons目录下即可

4、检查尘世百味需要的前置有没有装齐

5、重启服务器！！！ 切勿使用热重载！！


![当前版本](https://img.shields.io/github/v/release/haiman233/WorldTaste?include_prereleases)
![下载数](https://img.shields.io/github/downloads/haiman233/WorldTaste/total)

## 前置插件需求
前置(必须)：
- Slimefun
- GuizhanLibPlugin [点此下载](https://builds.guizhanss.com/ybw0014/GuizhanLibPlugin/master)
- Gastronomicon（美食家）[点此下载](https://builds.guizhanss.com/SlimefunGuguProject/Gastronomicon/master)
- ExoticGarden（异域花园）(推荐使用复合花园) [点此下载](https://builds.guizhanss.com/balugaq/ExoticGardenComplex/master)

软前置(可选)：
- Cultivation（农耕工艺） [点此下载](https://builds.guizhanss.com/SlimefunGuguProject/Cultivation/main)
- InfinityExpansion（无尽贪婪）[点此下载](https://builds.guizhanss.com/SlimefunGuguProject/InfinityExpansion/master)

## 公告

1、十分感谢[balugaq](https://github.com/balugaq)编写的[rsc-editor](https://github.com/balugaq/RSCEditor)，大大加快了尘世百味的推出进程

感谢balugaq、Eventually和南柯梦在脚本编写上给予的帮助

2、请勿使用尘世百味旧版本（有严重bug，最新版已全部修复）


## 游戏内展示

<img width="300" height="300" alt="74bb99b8868ad29f91af381108bc1a38" src="https://github.com/user-attachments/assets/c674dcd3-d308-43db-a639-230b9c9e72da" />
<img width="300" height="300" alt="d794707fd52c5ecefc2988ae4938b681" src="https://github.com/user-attachments/assets/068c3c29-6566-40bc-9f02-0ab2e61e9dfb" />


# 致开发者

如果你想要向尘世百味中添加自己的食物，需要先详细阅读[rsc wiki](https://rsc.hiworldmc.com/)，了解基础的编写流程

需要额外注意的是，如果在items文件里使用了自定义的多方块机器，需要在mb_machines文件里找到相应的多方块机器，并将配方额外的列一份在多方块的recipes里

尘世百味自带了制作食物所需的js脚本文件，使用相应脚本文件只需将文件名输入在items文件的 **script: ** 之后

脚本中，只含数字的脚本，对应着食物恢复的饥饿值和饱和度，“yan”代表这是香烟使用的脚本，“tang”代表这是汤使用的脚本，还有一些其它脚本，可以自行体验一番

如果你也想为这个附属做一些贡献，欢迎提pr



