# -*- coding: utf-8 -*-
"""
WorldTaste 脚本打包生成器
================================
把 scripts/ 下高度重复的「作物脚本」与「食物脚本」改写为对公共库的引用，
逻辑统一收进 scripts/lib/wt_crop.js 与 scripts/lib/wt_food.js。

用法（在 WorldTaste 项目根目录执行）:
    python scripts/lib/gen_refactor.py

说明:
- 只改写「结构标准」的脚本；无法安全解析的脚本会被跳过并打印到报告里，保持原样。
- 已改写过的脚本（已含 lib 引用）会直接跳过，可重复运行。
- 不会改动 yml，也不会改动 lib 自身。
"""

import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # scripts/
SKIP_DIRS = {"lib", "实用工具(可删，不参与加载)"}

BOOTSTRAP_FOOD = """var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_food.js')), 'UTF-8');
(0, eval)(code);
"""

BOOTSTRAP_CROP = """var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);
"""

# 强制转写（已人工确认结构标准）的食物脚本
FOOD_WHITELIST = {
    "1.js", "2.js", "3.js", "4.js", "5.js", "6.js", "7.js", "8.js", "9.js", "10.js",
    "11.js", "12.js", "13.js", "14.js", "15.js", "16.js", "17.js", "18.js", "19.js", "20.js",
    "baohe.js", "huifu.js", "baojian.js", "rou.js",
}


def num(s):
    f = float(s)
    return int(f) if f == int(f) else f


# 副手校验提示（WT_eatConsumable 内部已包含，解析时不应当作成功提示）
OFFHAND_WARN = "您必须使用主手进食且副手不能持有粘液科技物品！"

# 食物脚本里一旦出现这些“额外行为”API，说明并非纯进食逻辑，必须保留原文件
FORBIDDEN_FOOD = [
    "addPotionEffect", "createPotionEffect", "setFireTicks", "setHealth",
    "setRemainingAir", "damage(", "world.spawn", "spawnEntity", "giveItem",
    "getPlayer().addPotion", "removePotionEffect",
]


# ---------------- 食物脚本解析 ----------------
def parse_food(text, force):
    require_hungry = "getFoodLevel() >= 20" in text

    food = food_set = sat = sat_set = exh = None
    sat_regen = unsat_regen = starvation = max_air = None
    msg = None

    m = re.search(r"setFoodLevel\(\s*player\.getFoodLevel\(\)\s*\+\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
    if m:
        food = num(m.group(1))
    else:
        m = re.search(r"setFoodLevel\(\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
        if m:
            food_set = num(m.group(1))

    m = re.search(r"setSaturation\(\s*player\.getSaturation\(\)\s*\+\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
    if m:
        sat = num(m.group(1))
    else:
        m = re.search(r"setSaturation\(\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
        if m:
            sat_set = num(m.group(1))

    m = re.search(r"setExhaustion\(\s*player\.getExhaustion\(\)\s*-\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
    if m:
        exh = num(m.group(1))

    m = re.search(r"setSaturatedRegenRate\(\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
    sat_regen = num(m.group(1)) if m else None
    m = re.search(r"setUnsaturatedRegenRate\(\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
    unsat_regen = num(m.group(1)) if m else None
    m = re.search(r"setStarvationRate\(\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
    starvation = num(m.group(1)) if m else None
    m = re.search(r"setMaximumAir\(\s*([0-9]+(?:\.[0-9]+)?)\s*\)", text)
    max_air = num(m.group(1)) if m else None

    # 取第一个“非副手警告”的提示语作为成功提示（副手警告由 WT_eatConsumable 内部处理）
    candidates = [m for m in re.findall(r'sendMessage\(\s*"([^"]*)"\s*\)', text) if m != OFFHAND_WARN]
    msg = candidates[0] if candidates else None

    captured = sum(v is not None for v in [food, food_set, sat, sat_set, exh,
                                           sat_regen, unsat_regen, starvation, max_air])
    # 统计文件里所有 setter（排除 setAmount，那是消耗物品用的），
    # 只要出现未识别的 setter（如 setRemainingAir）就视为“不干净”，保留原文件。
    all_setters = re.findall(r"\.set([A-Z]\w*)\(", text)
    total_set = len([s for s in all_setters if s != "Amount"])

    is_on_eat = "function onEat" in text
    is_on_use = "function onUse" in text

    # 判断是否“干净”：所有 set* 都被成功解析（无变量/自定义逻辑）
    clean = (captured == total_set) and (total_set > 0)
    if not (force or clean):
        return None
    if captured == 0:
        return None

    return {
        "require_hungry": require_hungry,
        "food": food, "food_set": food_set,
        "sat": sat, "sat_set": sat_set, "exh": exh,
        "sat_regen": sat_regen, "unsat_regen": unsat_regen,
        "starvation": starvation, "max_air": max_air,
        "msg": msg, "on_eat": is_on_eat, "on_use": is_on_use,
    }


def build_food_output(p):
    opts = []
    if p["food"] is not None:
        opts.append("food: %s" % p["food"])
    if p["sat"] is not None:
        opts.append("saturation: %s" % p["sat"])
    if p["exh"] is not None:
        opts.append("exhaustion: %s" % p["exh"])
    if p["food_set"] is not None:
        opts.append("foodSet: %s" % p["food_set"])
    if p["sat_set"] is not None:
        opts.append("saturationSet: %s" % p["sat_set"])
    if p["sat_regen"] is not None:
        opts.append("satRegen: %s" % p["sat_regen"])
    if p["unsat_regen"] is not None:
        opts.append("unsatRegen: %s" % p["unsat_regen"])
    if p["starvation"] is not None:
        opts.append("starvation: %s" % p["starvation"])
    if p["max_air"] is not None:
        opts.append("maxAir: %s" % p["max_air"])
    if p["require_hungry"]:
        opts.append("requireHungry: true")
    if p["msg"]:
        opts.append('message: "%s"' % p["msg"])

    if p["on_eat"]:
        # onEat 形态：food/sat/exh 直接传入
        food = p["food"] if p["food"] is not None else 0
        sat = p["sat"] if p["sat"] is not None else 0
        exh = p["exh"] if p["exh"] is not None else 0
        return (BOOTSTRAP_FOOD +
                "\nfunction onEat(event, player, itemStack) {\n"
                "  WT_eatFood(event, %s, %s, %s);\n}\n" % (food, sat, exh))
    else:
        return (BOOTSTRAP_FOOD +
                "\nfunction onUse(event) {\n"
                "  WT_eatConsumable(event, { %s });\n}\n" % ", ".join(opts))


# ---------------- 作物脚本解析 ----------------
def parse_crop(text):
    if not ("function handleGrowth" in text or "growthStages" in text):
        return None

    id_m = re.search(r'growthStages\s*=\s*\{\s*"([^"]+)"', text)
    mat_m = re.search(r"material:\s*Material\.(\w+)", text)
    maxage_m = re.search(r"maxAge:\s*([0-9]+)", text)
    grow_m = re.search(r"GrowTimems_INFINITE\s*=\s*([0-9]+)", text)
    if not (id_m and mat_m and maxage_m and grow_m):
        return None

    cfg = {
        "id": id_m.group(1),
        "material": mat_m.group(1),
        "maxAge": int(maxage_m.group(1)),
        "growMs": int(grow_m.group(1)),
    }

    if re.search(r"stages:\s*smallSteps", text):
        cfg["stages"] = "WT_SMALL_STEPS"
    else:
        sm = re.search(r"var\s+steps\s*=\s*(\[[^\]]*\])", text, re.S)
        if not sm:
            return None
        cfg["stages"] = sm.group(1).strip()

    if "selectRandomDrop" in text:
        dm = re.search(r"let\s+drops\s*=\s*\[(.*?)\];", text, re.S)
        if not dm:
            return None
        items = re.findall(r'itemId:\s*"([^"]+)"\s*,\s*probability:\s*([0-9.]+)', dm.group(1))
        if not items:
            return None
        cfg["weightedDrops"] = [(i, float(w)) for i, w in items]
    else:
        pairs = re.findall(r"Math\.random\(\)\s*<\s*([0-9.]+)\s*\)\s*dropItem\(\s*\"([^\"]+)\"\s*\)", text)
        if pairs:
            cfg["drops"] = [(i, float(c)) for c, i in pairs]
        else:
            ids = re.findall(r'dropItem\(\s*"([^"]+)"\s*\)', text)
            cfg["drops"] = [(i, 1.0) for i in ids]
        if not cfg["drops"]:
            return None

    return cfg


def build_crop_output(cfg):
    lines = [BOOTSTRAP_CROP, ""]
    lines.append("WT_setupCrop({")
    lines.append('  id: "%s",' % cfg["id"])
    lines.append("  material: Material.%s," % cfg["material"])
    lines.append("  maxAge: %s," % cfg["maxAge"])
    lines.append("  growMs: %s," % cfg["growMs"])
    lines.append("  stages: %s," % cfg["stages"])
    if "weightedDrops" in cfg:
        lines.append("  weightedDrops: [")
        for i, w in cfg["weightedDrops"]:
            lines.append('    {id: "%s", weight: %s},' % (i, w))
        lines.append("  ]")
    else:
        lines.append("  drops: [")
        for i, c in cfg["drops"]:
            lines.append('    {id: "%s", chance: %s},' % (i, c))
        lines.append("  ]")
    lines.append("});")
    return "\n".join(lines) + "\n"


# ---------------- 主流程 ----------------
def main():
    converted = []
    skipped = []

    for root, dirs, files in os.walk(BASE):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if not f.endswith(".js"):
                continue
            path = os.path.join(root, f)
            rel = os.path.relpath(path, BASE)
            with open(path, "r", encoding="utf-8") as fh:
                text = fh.read()

            # 已转换过的直接跳过
            if "lib/wt_food.js" in text or "lib/wt_crop.js" in text:
                continue

            force = f in FOOD_WHITELIST
            crop = parse_crop(text)
            if crop:
                out = build_crop_output(crop)
                with open(path, "w", encoding="utf-8") as fh:
                    fh.write(out)
                converted.append((rel, "crop"))
                continue

            food = parse_food(text, force)
            if food and not any(bad in text for bad in FORBIDDEN_FOOD):
                out = build_food_output(food)
                with open(path, "w", encoding="utf-8") as fh:
                    fh.write(out)
                converted.append((rel, "food"))
                continue

            skipped.append(rel)

    print("=== 转换成功: %d 个 ===" % len(converted))
    for rel, kind in converted:
        print("  [%s] %s" % (kind, rel))
    print("\n=== 跳过（保持原样）: %d 个 ===" % len(skipped))
    for rel in skipped:
        print("  %s" % rel)


if __name__ == "__main__":
    main()
