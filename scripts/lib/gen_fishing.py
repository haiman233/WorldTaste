# gen_fishing.py — 将 scripts/diaoyu.js 重构成「引入公共库 + 数据 + 一行配置」的薄壳
# 所有辅助逻辑（掉落选择/物品解析/掉落生成/消息音效/事件绑定）已抽到 lib/wt_fishing.js。
# 原始掉落表与鱼饵->掉落表映射均从原文件自动提取，确保数据零改动。
import re, pathlib

root = pathlib.Path('scripts')
src = (root / 'diaoyu.js').read_text(encoding='utf-8')

# 1) 提取五个掉落表块（原样保留）
table_blocks = re.findall(r'const \w+_DROPS = \[.*?\];', src, re.S)
assert table_blocks, "未找到掉落表"
tables = '\n\n'.join(table_blocks)

# 2) 提取 baitId -> 表名 映射
mapping = re.findall(r'sfItem_Off_id == "([^"]+)"[\s\S]*?drops = (\w+);', src)
assert mapping, "未找到鱼饵映射"

baits = '{\n' + '\n'.join(f'    "{bid}": {tname},' for bid, tname in mapping) + '\n  }'

header = """// 钓鱼事件脚本（薄壳）：通用逻辑见 lib/wt_fishing.js
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_fishing.js')), 'UTF-8');
(0, eval)(code);

"""

setup = f"WT_setupFishing({{\n  rodId: \"WT_BAIWEIDIAOGAN\",\n  baits: {baits}\n}});\n"

out = header + tables + '\n\n' + setup
(root / 'diaoyu.js').write_text(out, encoding='utf-8')
print("已重写 diaoyu.js | 掉落表:", len(table_blocks), "| 鱼饵映射:", dict(mapping))
